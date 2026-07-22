const tokens = onetype.Addon('workspace.tokens', (addon) =>
{
    addon.Table('tokens');

    addon.Field('id', {
        type: 'number',
        description: 'Unique token id.'
    });

    addon.Field('user_id', {
        type: 'number',
        required: true,
        description: 'Id of the user the token was issued to.'
    });

    addon.Field('type', {
        type: 'string',
        required: true,
        description: 'What the token is for, like session, verification or recovery.'
    });

    addon.Field('token', {
        type: 'string',
        required: true,
        description: 'The token value itself, unique across the instance.'
    });

    addon.Field('ip_address', {
        type: 'string',
        description: 'IP address the token was issued from.'
    });

    addon.Field('user_agent', {
        type: 'string',
        description: 'User agent the token was issued from.'
    });

    addon.Field('is_verified', {
        type: 'boolean',
        value: false,
        description: 'Whether the token passed its verification step.'
    });

    addon.Field('updated_at', {
        type: 'string',
        metadata: { cast: 'date' },
        description: 'Timestamp of the last change.'
    });

    addon.Field('created_at', {
        type: 'string',
        metadata: { cast: 'date' },
        description: 'Timestamp of when the token was issued.'
    });

    addon.Field('expires_at', {
        type: 'string',
        metadata: { cast: 'date' },
        description: 'Timestamp after which the token is no longer valid.'
    });

    addon.Schema('id bigserial primary key');
    addon.Schema('user_id bigint not null');
    addon.Schema('type varchar(50) not null');
    addon.Schema('token varchar(255) not null');
    addon.Schema('ip_address varchar(45)');
    addon.Schema('user_agent text');
    addon.Schema('is_verified boolean not null default false');
    addon.Schema('updated_at timestamptz not null default now()');
    addon.Schema('created_at timestamptz not null default now()');
    addon.Schema('expires_at timestamptz not null');
    addon.Schema('unique (token)');
    addon.Schema('index (user_id)');
    addon.Schema('index (type)');
    addon.Schema('index (expires_at)');
});

export default tokens;
