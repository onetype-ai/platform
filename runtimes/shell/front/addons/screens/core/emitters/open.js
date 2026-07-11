onetype.EmitRegister('ui.screens.open', {
	description: 'Fired after a screen opens. Not fired when opening the screen that is already open.',
	metadata: { addon: 'ui.screens' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the screen that opened.'
		}
	}
});
