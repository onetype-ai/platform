import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import collections from '#shared/system/collections/addon.js';

/* Create an item in a collection. Resolves the collection's runtime addon by slug,
   then creates a record with the given data in a transaction (versioned + i18n). */

onetype.Pipeline('collections:items:create', {
	description: 'Create an item in a collection.',
	wrap: (run) => database.Fn('transaction', (transaction) => run({ transaction })),
	in: {
		team_id: ['string', null, true],
		slug: ['string', null, true],
		data: ['object', {}],
		language: ['string'],
		languages: ['array']
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

.Join('create', 20, {
	description: 'Create the record.',
	out: { item: ['object'] },
	callback: async function({ addon, team_id, data, language, languages })
	{
		const item = addon.Item({ ...data, team_id });

		await item.Create({ connection: this.wrap.transaction, language: language || null, languages: languages || null });

		return { item };
	}
});
