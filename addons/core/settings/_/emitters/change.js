onetype.EmitRegister('modules.settings.change', {
    description: 'Fired after a setting value changes, through the modules:settings:set command, a direct set or the restore on load.',
    metadata: { addon: 'modules.settings' },
    config: {
        id: {
            type: 'string',
            description: 'ID of the setting that changed.'
        },
        value: {
            type: 'any',
            description: 'Value the setting now holds.'
        }
    }
});
