onetype.EmitRegister('platform.settings.change', {
    description: 'Fired after a setting value changes, through the platform:settings:set command, a direct set or the restore on load.',
    addon: 'platform.settings',
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
