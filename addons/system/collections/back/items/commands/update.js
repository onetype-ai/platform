import commands from '@onetype/framework/commands';
import collections from '../../addon.js';
import types from '../../types.js';

commands.Item({
	id: 'collections:update',
	exposed: true,
	description: 'Update a collection definition and resync its storage.',
	metadata: { addon: 'collections' },
	in: {
		slug: ['string', null, true],
		name: ['string'],
		icon: ['string'],
		fields: {
			type: 'array',
			each: {
				type: 'object',
				config: 'collections.field'
			},
			description: 'New field definitions, replacing the current ones.'
		},
		search: {
			type: 'array',
			each: {
				type: 'string'
			},
			description: 'Fields matched by search.'
		}
	},
	out: {
		collection: {
			type: 'object',
			config: 'collections.collection',
			description: 'The updated collection.'
		}
	},
	callback: async function(properties, resolve)
	{
		const item = await collections.Find().filter('slug', properties.slug).one();

		if(!item)
		{
			return resolve(null, 'Collection ' + properties.slug + ' not found.', 404);
		}

		if(item.Get('system'))
		{
			return resolve(null, 'Collection ' + properties.slug + ' is a system collection and cannot be changed.', 403);
		}

		if(properties.fields)
		{
			const unknown = properties.fields.find((field) => !types.ItemGet(field.type));

			if(unknown)
			{
				return resolve(null, 'Unknown field type ' + unknown.type + ' on field ' + unknown.name + '.', 400);
			}

			for(const locked of item.Get('fields').filter((field) => field.locked))
			{
				const incoming = properties.fields.find((field) => field.name === locked.name);
				const changed = ['type', 'required', 'value', 'translate', 'unique', 'index', 'reference', 'locked'].some((key) => JSON.stringify(incoming?.[key] ?? null) !== JSON.stringify(locked[key] ?? null));

				if(!incoming || changed)
				{
					return resolve(null, 'Field ' + locked.name + ' is locked and cannot be changed.', 403);
				}
			}

			item.Set('fields', properties.fields);
		}

		properties.name && item.Set('name', properties.name);
		properties.icon && item.Set('icon', properties.icon);
		properties.search && item.Set('search', properties.search);

		await item.Update();
		await collections.Fn('apply', item);

		resolve({ collection: item.GetData() }, 'Collection ' + properties.slug + ' updated.');
	}
});
