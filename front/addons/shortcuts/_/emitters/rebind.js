onetype.EmitRegister('platform.shortcuts.rebind', {
    description: 'Fired after the key combination of a shortcut changes through the modules:shortcuts:rebind command, both on a new key and on reset to default.',
    addon: 'platform.shortcuts',
    config: {
        id: {
            type: 'string',
            description: 'ID of the shortcut that changed.'
        },
        key: {
            type: 'string',
            description: 'Key combination the shortcut listens to now.'
        }
    }
});
