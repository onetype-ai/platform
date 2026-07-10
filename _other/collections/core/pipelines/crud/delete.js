import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import collections from '#shared/system/collections/addon.js';

/* Soft-delete a collection definition. The physical table is left intact (data is
   never dropped, so the collection can be restored). */

onetype.Pipeline('collections:delete', {
	description: 'Soft-delete a collection definition.',
	wrap: (run) => database.Fn('transaction', (transaction) => run({ transaction })),
	in: {
		id: ['string', null, true],
		team_id: ['string', null, true]
	},
	out: {
		collection: ['object', null, true]
	}
})

.Join('load', 10, {
	description: 'Load the collection for this team.',
	out: { collection: ['object'] },
	callback: async function({ id, team_id }, resolve)
	{
		const collection = await collections.Find({ connection: this.wrap.transaction })
			.filter('id', id)
			.filter('team_id', team_id)
			.filter('deleted_at', null, 'NULL')
			.one();

		if(!collection)
		{
			return resolve(null, 'Collection not found.', 404);
		}

		return { collection };
	}
})

.Join('delete', 20, {
	description: 'Soft-delete the catalog definition.',
	callback: async function({ collection })
	{
		await collection.Delete({ connection: this.wrap.transaction });
	}
});
