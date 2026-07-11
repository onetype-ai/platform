import onetype from '@onetype/framework';

onetype.DataSchema('collections.collection', {
	id: {
		type: 'number',
		description: 'Catalog id, also the partition key.'
	},
	slug: {
		type: 'string',
		required: true,
		description: 'Stable text key the collection is addressed by.'
	},
	name: {
		type: 'string',
		description: 'Display name shown in the UI.'
	},
	icon: {
		type: 'string',
		description: 'Material Symbols icon name.'
	},
	system: {
		type: 'boolean',
		value: false,
		description: 'Whether the collection is declared in code and locked for the UI.'
	},
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
			type: 'string',
			description: 'A field name included in full text search.'
		},
		description: 'Fields matched by search.'
	},
	versions: {
		type: 'boolean',
		value: true,
		description: 'Whether entries keep version history.'
	},
	config: {
		type: 'object',
		value: {},
		description: 'Free form collection configuration.'
	},
	created_at: {
		type: 'string',
		description: 'When the collection was created.'
	},
	updated_at: {
		type: 'string',
		description: 'When the definition last changed.'
	},
	deleted_at: {
		type: 'string',
		description: 'Soft delete stamp, null while alive.'
	}
});
