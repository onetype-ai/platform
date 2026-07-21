onetype.EmitRegister('platform.config.set', {
	description: 'Fires after a config value changes through the platform config facade. Listeners react to the new value, they cannot cancel the change.',
	metadata: { addon: 'config' },
	config: {
		key: {
			type: 'string',
			description: 'Key of the config entry that changed.'
		},
		value: {
			type: 'any',
			description: 'The new value of the entry.'
		}
	}
});
