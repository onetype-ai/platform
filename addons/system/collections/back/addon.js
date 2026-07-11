import onetype from '@onetype/framework';

const collections = onetype.Addon('collections', (addon) =>
{
	addon.Field('id', {
		type: 'number',
		description: 'Catalog id, also the partition key: entries of this collection live in entries_<id>.'
	});

	addon.Field('slug', {
		type: 'string',
		required: true,
		description: 'Stable text key, lowercase. Collections are addressed by slug everywhere and it never changes.'
	});

	addon.Field('name', {
		type: 'string',
		description: 'Display name shown in the UI.'
	});

	addon.Field('icon', {
		type: 'string',
		description: 'Material Symbols icon name.'
	});

	addon.Field('system', {
		type: 'boolean',
		value: false,
		description: 'System collections are declared in code and cannot be changed or deleted from the UI.'
	});

	addon.Field('fields', {
		type: 'array',
		value: [],
		each: {
			type: 'object',
			config: 'collections.field'
		},
		description: 'Field definitions of the collection, the source the engine materializes from.'
	});

	addon.Field('search', {
		type: 'array',
		value: [],
		each: {
			type: 'string',
			description: 'A field name included in full text search.'
		},
		description: 'Fields matched by search on this collection.'
	});

	addon.Field('versions', {
		type: 'boolean',
		value: true,
		description: 'Whether entries keep full version history with soft delete and time travel. On by default.'
	});

	addon.Field('config', {
		type: 'object',
		value: {},
		description: 'Free form collection configuration.'
	});

	addon.Field('created_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'When the collection was created.'
	});

	addon.Field('updated_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'When the collection definition last changed.'
	});

	addon.Field('deleted_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'Soft delete stamp, null while the collection is alive.'
	});

	addon.Table('collections');

	addon.Schema('id bigserial primary key');
	addon.Schema('slug varchar(255)');
	addon.Schema('name text');
	addon.Schema('icon text');
	addon.Schema('system boolean default false');
	addon.Schema('fields jsonb');
	addon.Schema('search jsonb');
	addon.Schema('versions boolean default true');
	addon.Schema('config jsonb');
	addon.Schema('created_at timestamptz');
	addon.Schema('updated_at timestamptz');
	addon.Schema('deleted_at timestamptz');
	addon.Schema('unique (slug)');

	addon.Versions('*');
});

export default collections;
