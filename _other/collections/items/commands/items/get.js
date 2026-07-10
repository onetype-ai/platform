import commands from '@onetype/framework/commands';
import collections from '#shared/system/collections/addon.js';

commands.Item({
	id: 'collections:items:get',
	exposed: true,
	method: 'GET',
	endpoint: '/api/collections/:slug/items/:id',
	description: 'Get one item from a collection, in the requested language.',
	in: {
		slug: ['string', null, true],
		id: ['string', null, true]
	},
	out: { item: ['object', null, true] },
	callback: async function(properties, resolve)
	{
		if(!this.http.state.user)
		{
			return resolve(null, 'Login required.', 401);
		}

		const team = this.http.state.user.team.id;
		const addon = await collections.Fn('addon', properties.slug, team);

		if(!addon)
		{
			return resolve(null, 'Collection "' + properties.slug + '" not found.', 404);
		}

		const item = await addon.Find({ language: this.http.state.language || null, languages: this.http.state.languages || null })
			.filter('id', properties.id)
			.filter('team_id', team)
			.one();

		if(!item)
		{
			return resolve(null, 'Item not found.', 404);
		}

		resolve({ item: item.GetData() });
	}
});
