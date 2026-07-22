const collaborators = onetype.Addon('collaborators', (addon) =>
{
    addon.Field('id', {
        type: 'string',
        required: true,
        description: 'Unique collaborator id, the session identity inside the editor.'
    });

    addon.Field('name', {
        type: 'string',
        required: true,
        description: 'Display name shown on the avatar and next to the cursor.'
    });

    addon.Field('color', {
        type: 'string',
        value: 'blue',
        options: ['brand', 'blue', 'red', 'orange', 'green'],
        description: 'Color token that paints the avatar and the cursor.'
    });

    addon.Field('type', {
        type: 'string',
        value: 'user',
        options: ['user', 'agent'],
        description: 'user is a person, agent is an AI assistant working inside the editor.'
    });

    addon.Field('self', {
        type: 'boolean',
        value: false,
        description: 'Marks the local session. The own cursor is never drawn.'
    });
});
