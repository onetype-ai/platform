onetype.SchemasRegister('platform.tokens.token', {
    description: 'The workspace token shape.',
    addon: 'platform.tokens',
    config: {
        id: {
            type: 'number',
            description: 'Unique token id.'
        },
        user_id: {
            type: 'number',
            description: 'Id of the user the token was issued to.'
        },
        type: {
            type: 'string',
            description: 'What the token is for, like Session, Access or Verify.'
        },
        is_verified: {
            type: 'boolean',
            description: 'Whether the token passed its verification step.'
        },
        expires_at: {
            type: 'string',
            description: 'Timestamp after which the token is no longer valid.'
        },
        created_at: {
            type: 'string',
            description: 'Timestamp of when the token was issued.'
        }
}
});
