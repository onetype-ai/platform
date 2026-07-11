import commands from '@onetype/framework/commands';
import collections from '../../addon.js';

commands.Item({
	id: 'collections:list',
	exposed: true,
	description: 'List every collection in the catalog.',
	metadata: { addon: 'collections' },
	out: {
		items: {
			type: 'array',
			each: {
				type: 'object',
				config: 'collections.collection'
			},
			description: 'Every alive collection, system and user made.'
		}
	},
	callback: async function(properties, resolve)
	{
		const items = await collections.Find().sort('id', 'asc').many();

		resolve({ items: items.map((item) => item.GetData()) });
	}
});
