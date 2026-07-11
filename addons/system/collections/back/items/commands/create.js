import commands from '@onetype/framework/commands';
import collections from '../../addon.js';
import types from '../../types.js';

commands.Item({
	id: 'collections:create',
	exposed: true,
	description: 'Create a collection: catalog row, partition and runtime addon in one move.',
	metadata: { addon: 'collections' },
	in: {
		slug: ['string', null, true],
		name: ['string'],
		icon: ['string'],
		fields: {
			type: 'array',
			value: [],
			each: {
				type: 'object',
				config: 'collections.field'
			},
			description: 'Field definitions of the collection.'
		},
		search: {
			type: 'array',
			value: [],
			each: {
				type: 'string'
			},
			description: 'Fields matched by search.'
		},
		versions: ['boolean', true]
	},
	out: {
		collection: {
			type: 'object',
			config: 'collections.collection',
			description: 'The created collection.'
		}
	},
	callback: async function(properties, resolve)
	{
		if(!/^[a-z][a-z0-9_]*$/.test(properties.slug))
		{
			return resolve(null, 'Slug ' + properties.slug + ' must be lowercase letters, digits and underscores.', 400);
		}

		const unknown = properties.fields.find((field) => !types.ItemGet(field.type));

		if(unknown)
		{
			return resolve(null, 'Unknown field type ' + unknown.type + ' on field ' + unknown.name + '.', 400);
		}

		const existing = await collections.Find().filter('slug', properties.slug).one();

		if(existing)
		{
			return resolve(null, 'Collection ' + properties.slug + ' already exists.', 409);
		}

		const item = await collections.Fn('sync', {
			slug: properties.slug,
			name: properties.name || properties.slug,
			icon: properties.icon || null,
			system: false,
			fields: properties.fields,
			search: properties.search,
			versions: properties.versions,
			config: {}
		});

		resolve({ collection: item.GetData() }, 'Collection ' + properties.slug + ' created.');
	}
});
