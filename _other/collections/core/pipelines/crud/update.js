import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import collections from '#shared/system/collections/addon.js';

/* Update a collection definition (name/icon/fields) and re-sync its table so new
   fields become columns. Auto-sync never drops; removed fields stay as columns. */

onetype.Pipeline('collections:update', {
	description: 'Update a collection definition and re-materialize its table.',
	wrap: (run) => database.Fn('transaction', (transaction) => run({ transaction })),
	in: {
		id: ['string', null, true],
		team_id: ['string', null, true],
		name: ['string'],
		icon: ['string'],
		kind: ['string'],
		fields: ['array']
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

.Join('store', 20, {
	description: 'Apply the changes to the catalog definition.',
	callback: async function({ collection, name, icon, kind, fields })
	{
		if(name !== undefined) collection.Set('name', name);
		if(icon !== undefined) collection.Set('icon', icon);
		if(kind !== undefined) collection.Set('kind', kind);
		if(fields !== undefined) collection.Set('fields', fields);

		await collection.Update({ connection: this.wrap.transaction });
	}
})

.Join('materialize', 30, {
	description: 'Re-materialize the table so new fields become columns.',
	callback: async function({ collection })
	{
		const addon = collections.Fn('materialize', collection.GetData());

		await database.Fn('sync.table', this.wrap.transaction, addon);
	}
});
