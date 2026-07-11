import onetype from '@onetype/framework';

const projects = onetype.Addon('workspace.projects', (addon) =>
{
	addon.Table('projects');

	addon.Field('id', {
		type: 'number',
		description: 'Unique project id.'
	});

	addon.Field('team_id', {
		type: 'number',
		required: true,
		description: 'Id of the team the project belongs to.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Project name shown across the platform.'
	});

	addon.Field('description', {
		type: 'string',
		description: 'Short text about what the project is.'
	});

	addon.Field('color', {
		type: 'string',
		description: 'Accent color as a hex or rgba string.'
	});

	addon.Field('config', {
		type: 'object',
		value: {},
		description: 'Free form project configuration keyed by package.'
	});

	addon.Field('applications', {
		type: 'array',
		value: [],
		each: {
			type: 'string',
			description: 'Slug of a package enabled on the project.'
		},
		description: 'Packages enabled on the project.'
	});

	addon.Field('updated_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'Timestamp of the last change.'
	});

	addon.Field('created_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'Timestamp of when the project was created.'
	});

	addon.Field('deleted_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'Timestamp of a soft delete, null while the project is alive.'
	});

	addon.Schema('id bigserial primary key');
	addon.Schema('team_id bigint not null');
	addon.Schema('name varchar(255) not null');
	addon.Schema('description text');
	addon.Schema('color varchar(30)');
	addon.Schema('config jsonb not null default \'{}\'');
	addon.Schema('applications jsonb not null default \'[]\'');
	addon.Schema('updated_at timestamptz not null default now()');
	addon.Schema('created_at timestamptz not null default now()');
	addon.Schema('deleted_at timestamptz');
	addon.Schema('index (team_id)');
});

export default projects;
