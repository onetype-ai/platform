import onetype from '@onetype/framework';

onetype.DataSchema('collections.field', {
	name: {
		type: 'string',
		required: true,
		description: 'Field name, the key used in items, filters and sorting.'
	},
	type: {
		type: 'string',
		required: true,
		description: 'Semantic field type from the collections.types registry, like text, richtext, number, date, image or reference. Slot backed types get an indexed column, the rest live in the document.'
	},
	value: {
		type: 'any',
		description: 'Default value applied when an entry is created without one.'
	},
	required: {
		type: 'boolean',
		value: false,
		description: 'Whether the field must have a value.'
	},
	description: {
		type: 'string',
		description: 'What the field holds, shown in the UI and to the AI layer.'
	},
	translate: {
		type: 'boolean',
		value: false,
		description: 'Whether the field carries per language values through the translations overlay.'
	},
	locked: {
		type: 'boolean',
		value: false,
		description: 'Locked fields cannot be changed or removed from the UI.'
	},
	unique: {
		type: 'boolean',
		value: false,
		description: 'Whether values must be unique inside the collection. Needs a slot backed type.'
	},
	index: {
		type: 'boolean',
		value: false,
		description: 'Whether the field gets a btree index for filtering and sorting.'
	},
	reference: {
		type: 'string',
		description: 'Slug of the collection this field references. The value stores the referenced entry id.'
	}
});
