$ot.workspace.users = onetype.Addon('workspace.users', (addon) =>
{
    addon.Field('id', {
        type: 'string',
        required: true,
        description: 'Unique user id.'
    });

    addon.Field('name', {
        type: 'string',
        required: true,
        description: 'Display name.'
    });

    addon.Field('email', {
        type: 'string',
        description: 'Email address.'
    });
});
