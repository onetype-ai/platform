import commands from '@onetype/framework/commands';
import types from '../../types.js';

commands.Item({
	id: 'collections:types',
	exposed: true,
	description: 'List every field type in the registry, the palette the UI builds fields from.',
	metadata: { addon: 'collections' },
	out: {
		items: {
			type: 'array',
			each: {
				type: 'object',
				config: {
					id: ['string', null, true],
					name: ['string', null, true],
					icon: ['string', null, true],
					group: ['string', null, true],
					type: ['string', null, true],
					slot: ['boolean', true]
				}
			},
			description: 'Every registered field type with its palette metadata and storage mapping.'
		}
	},
	callback: async function(properties, resolve)
	{
		resolve({ items: Object.values(types.Items()).map((item) => item.GetData()) });
	}
});
