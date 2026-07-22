onetype.SchemasRegister('workspace.user', {
    id: {
        type: 'number',
        description: 'Unique user id.'
    },
    name: {
        type: 'string',
        description: 'Display name shown across the platform.'
    },
    email: {
        type: 'string',
        description: 'Email address the user signs in with.'
    },
    is_verified: {
        type: 'boolean',
        description: 'Whether the email address is verified.'
    },
    created_at: {
        type: 'string',
        description: 'Timestamp of when the user was created.'
    },
    updated_at: {
        type: 'string',
        description: 'Timestamp of the last change.'
    }
});
