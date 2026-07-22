onetype.EmitRegister('platform.config.set', {
    description: 'Fires after a config value changes through the platform config facade. Listeners react to the new value, they cannot cancel the change.',
    addon: 'platform.config',
    config: {
        id: {
            type: 'string',
            description: 'Id of the config entry that changed.'
        },
        value: {
            type: 'any',
            description: 'The new value of the entry.'
        }
    }
});
