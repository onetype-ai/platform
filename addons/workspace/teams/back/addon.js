import onetype from '@onetype/framework';

const teams = onetype.Addon('workspace.teams', (addon) =>
{
	addon.Table('teams');

	addon.Field('id', {
		type: 'number',
		description: 'Unique team id.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Team name shown across the platform.'
	});

	addon.Field('description', {
		type: 'string',
		description: 'Short text about what the team is.'
	});

	addon.Field('updated_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'Timestamp of the last change.'
	});

	addon.Field('created_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'Timestamp of when the team was created.'
	});

	addon.Field('deleted_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'Timestamp of a soft delete, null while the team is alive.'
	});

	addon.Schema('id bigserial primary key');
	addon.Schema('name varchar(255) not null');
	addon.Schema('description text');
	addon.Schema('updated_at timestamptz not null default now()');
	addon.Schema('created_at timestamptz not null default now()');
	addon.Schema('deleted_at timestamptz');
});

export default teams;
