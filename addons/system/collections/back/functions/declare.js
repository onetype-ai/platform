import onetype from '@onetype/framework';
import collections from '../addon.js';
import types from '../types.js';

collections.Fn('declare', function(slug, callback)
{
	const definition = { slug, name: slug, icon: null, system: false, fields: [], search: [], versions: true, config: {} };

	callback({
		Name(name)
		{
			definition.name = name;
		},
		Icon(icon)
		{
			definition.icon = icon;
		},
		System(value = true)
		{
			definition.system = value !== false;
		},
		Versions(value = true)
		{
			definition.versions = value !== false;
		},
		Search(fields)
		{
			definition.search = Array.isArray(fields) ? fields : [fields];
		},
		Config(config)
		{
			definition.config = config;
		},
		Field(name, type, options = {})
		{
			if(!types.ItemGet(type))
			{
				throw onetype.Error(400, 'Unknown field type :type: on :collection:.:name:.', { type, collection: slug, name });
			}

			definition.fields.push({
				name,
				type,
				value: options.value === undefined ? null : options.value,
				required: options.required === true,
				description: options.description || null,
				translate: options.translate === true,
				locked: options.locked === true,
				unique: options.unique === true,
				index: options.index === true,
				reference: options.collection || null
			});
		}
	});

	const declared = this.StoreGet('declared') || [];

	declared.push(definition);
	this.StoreSet('declared', declared);

	return definition;
});
