const shortcuts = onetype.Addon('shortcuts', (addon) =>
{
    addon.Field('id', {
        type: 'string',
        required: true,
        description: 'Unique shortcut id.'
    });

    addon.Field('name', {
        type: 'string',
        description: 'Human readable name, shown in search and listings.'
    });

    addon.Field('group', {
        type: 'string',
        description: 'Group label for organizing shortcuts in listings.'
    });

    addon.Field('description', {
        type: 'string',
        description: 'What the shortcut does.'
    });

    addon.Field('key', {
        type: 'string',
        required: true,
        description: 'Key combination: modifiers and key joined with +, like meta+shift+k or ctrl+1.'
    });

    addon.Field('condition', {
        type: 'object',
        value: {},
        config: {
            app: {
                type: 'array',
                value: [],
                each: { type: 'string' },
                description: 'App ids the shortcut belongs to. Empty means every app.'
            },
            mode: {
                type: 'array',
                value: [],
                each: { type: 'string' },
                description: 'Mode ids the shortcut belongs to. Empty means every mode.'
            },
            user: {
                type: 'boolean',
                value: false,
                description: 'When true, the shortcut fires only while a user is logged in.'
            },
            permission: {
                type: 'array',
                value: [],
                each: { type: 'string' },
                description: 'Permission ids required for the shortcut. Empty means no permission needed.'
            },
            callback: {
                type: 'function',
                description: 'Custom check called with the item and the keyboard event. Return false to skip. Runs after app, mode, user pass.'
            }
        },
        description: 'Firing rules. Empty object means the shortcut fires everywhere.'
    });

    addon.Field('callback', {
        type: 'function',
        required: true,
        description: 'Function to run when the shortcut fires. Receives the trigger properties.'
    });

    addon.Field('enabled', {
        type: 'boolean',
        value: true,
        description: 'Disabled shortcuts never fire.'
    });

    addon.Field('prevent', {
        type: 'boolean',
        value: true,
        description: 'Calls preventDefault on the keyboard event when the shortcut fires.'
    });

    addon.Field('order', {
        type: 'number',
        value: 1,
        description: 'Run position when multiple shortcuts match the same key. Lower runs first.'
    });
});
