import commands from '@onetype/framework/commands';
import collections from '../../addon.js';

commands.Item({
	id: 'collections:get',
	exposed: true,
	description: 'Get one collection by slug.',
	metadata: { addon: 'collections' },
	in: {
		slug: ['string', null, true]
	},
	out: {
		collection: {
			type: 'object',
			config: 'collections.collection',
			description: 'The collection definition.'
		}
	},
	callback: async function(properties, resolve)
	{
		const item = await collections.Find().filter('slug', properties.slug).one();

		if(!item)
		{
			return resolve(null, 'Collection ' + properties.slug + ' not found.', 404);
		}

		resolve({ collection: item.GetData() });
	}
});
