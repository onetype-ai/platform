import onetype from '@onetype/framework';

const users = onetype.Addon('workspace.users', (addon) =>
{
	addon.Table('users');

	addon.Field('id', {
		type: 'number',
		description: 'Unique user id.'
	});

	addon.Field('team_id', {
		type: 'number',
		required: true,
		description: 'Id of the team the user belongs to.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Display name shown across the platform.'
	});

	addon.Field('email', {
		type: 'string',
		required: true,
		description: 'Email address the user signs in with, unique across the instance.'
	});

	addon.Field('password', {
		type: 'string',
		required: true,
		description: 'Password hash, never leaves the back.'
	});

	addon.Field('is_verified', {
		type: 'boolean',
		value: false,
		description: 'Whether the email address is verified.'
	});

	addon.Field('updated_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'Timestamp of the last change.'
	});

	addon.Field('created_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'Timestamp of when the user was created.'
	});

	addon.Field('deleted_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'Timestamp of a soft delete, null while the user is alive.'
	});

	addon.Schema('id bigserial primary key');
	addon.Schema('team_id bigint not null');
	addon.Schema('name varchar(255) not null');
	addon.Schema('email varchar(255) not null');
	addon.Schema('password varchar(255) not null');
	addon.Schema('is_verified boolean not null default false');
	addon.Schema('updated_at timestamptz not null default now()');
	addon.Schema('created_at timestamptz not null default now()');
	addon.Schema('deleted_at timestamptz');
	addon.Schema('unique (email)');
	addon.Schema('index (team_id)');
});

export default users;
