onetype.EmitRegister('platform.shortcuts.toggle', {
	description: 'Fired after a shortcut is enabled or disabled through the modules:shortcuts:toggle command. Not fired when the state did not change.',
	metadata: { addon: 'shortcuts' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the shortcut that changed.'
		},
		enabled: {
			type: 'boolean',
			description: 'State the shortcut ended up in.'
		}
	}
});
