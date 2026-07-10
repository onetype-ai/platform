import commands from '@onetype/framework/commands';
import collections from '#shared/system/collections/addon.js';

commands.Item({
	id: 'collections:get',
	exposed: true,
	method: 'GET',
	endpoint: '/api/collections/:slug',
	description: 'Get one collection definition by slug.',
	in: {
		slug: ['string', null, true]
	},
	out: 'collection',
	callback: async function(properties, resolve)
	{
		if(!this.http.state.user)
		{
			return resolve(null, 'Login required.', 401);
		}

		const collection = await collections.Find()
			.filter('slug', properties.slug)
			.filter('team_id', this.http.state.user.team.id)
			.filter('deleted_at', null, 'NULL')
			.one();

		if(!collection)
		{
			return resolve(null, 'Collection "' + properties.slug + '" not found.', 404);
		}

		resolve(collection.GetData());
	}
});
