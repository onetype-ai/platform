import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import collections from '#shared/system/collections/addon.js';

/* Create a collection: validate, store the definition in the catalog, then
   materialize it (database auto-sync creates the real collection_<slug> table). */

onetype.Pipeline('collections:create', {
	description: 'Create a collection definition for a team and materialize its table.',
	wrap: (run) => database.Fn('transaction', (transaction) => run({ transaction })),
	in: {
		team_id: ['string', null, true],
		slug: ['string', null, true],
		name: ['string', null, true],
		icon: ['string', ''],
		kind: ['string', 'list'],
		fields: ['array', []]
	},
	out: {
		collection: ['object', null, true]
	}
})

.Join('validate', 10, {
	description: 'Validate slug and name, ensure the slug is free for this team.',
	callback: async function({ team_id, slug, name }, resolve)
	{
		if(!name || !name.trim())
		{
			return resolve(null, 'Collection must have a name.', 400);
		}

		if(!slug || !/^[a-z][a-z0-9_]*$/.test(slug))
		{
			return resolve(null, 'Slug must be lowercase letters, numbers and underscores, starting with a letter.', 400);
		}

		const existing = await collections.Find({ connection: this.wrap.transaction })
			.filter('slug', slug)
			.filter('team_id', team_id)
			.filter('deleted_at', null, 'NULL')
			.one();

		if(existing)
		{
			return resolve(null, 'A collection with slug "' + slug + '" already exists.', 409);
		}
	}
})

.Join('store', 20, {
	description: 'Store the collection definition in the catalog.',
	out: { collection: ['object'] },
	callback: async function({ team_id, slug, name, icon, kind, fields })
	{
		const collection = collections.Item({ team_id, slug, name, icon, kind, fields });

		await collection.Create({ connection: this.wrap.transaction });

		return { collection };
	}
})

.Join('materialize', 30, {
	description: 'Materialize the collection table from its definition.',
	callback: async function({ collection })
	{
		const addon = collections.Fn('materialize', collection.GetData());

		await database.Fn('sync.table', this.wrap.transaction, addon);
	}
});
