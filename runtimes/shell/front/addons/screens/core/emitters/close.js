onetype.EmitRegister('ui.screens.close', {
	description: 'Fired after the active screen closes and the normal shell takes over.',
	metadata: { addon: 'ui.screens' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the screen that closed.'
		}
	}
});
