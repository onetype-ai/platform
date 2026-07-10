import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import collections from '#shared/system/collections/addon.js';

/* Delete an item in a collection (soft-delete, since collections are versioned). */

onetype.Pipeline('collections:items:delete', {
	description: 'Delete an item in a collection.',
	wrap: (run) => database.Fn('transaction', (transaction) => run({ transaction })),
	in: {
		team_id: ['string', null, true],
		slug: ['string', null, true],
		id: ['string', null, true]
	},
	out: {
		item: ['object', null, true]
	}
})

.Join('addon', 10, {
	description: 'Resolve the collection runtime addon.',
	out: { addon: ['object'] },
	callback: async function({ slug, team_id }, resolve)
	{
		const addon = await collections.Fn('addon', slug, team_id, this.wrap.transaction);

		if(!addon)
		{
			return resolve(null, 'Collection "' + slug + '" not found.', 404);
		}

		return { addon };
	}
})

.Join('load', 20, {
	description: 'Load the item for this team.',
	out: { item: ['object'] },
	callback: async function({ addon, id, team_id }, resolve)
	{
		const item = await addon.Find({ connection: this.wrap.transaction })
			.filter('id', id)
			.filter('team_id', team_id)
			.one();

		if(!item)
		{
			return resolve(null, 'Item not found.', 404);
		}

		return { item };
	}
})

.Join('delete', 30, {
	description: 'Soft-delete the item.',
	callback: async function({ item })
	{
		await item.Delete({ connection: this.wrap.transaction });
	}
});
