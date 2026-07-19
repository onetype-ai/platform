onetype.EmitRegister('ui.apps.open', {
	description: 'Fired after an app becomes active. Not fired when opening the app that is already active.',
	metadata: { addon: 'ui.apps' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the app that became active.'
		}
	}
});
