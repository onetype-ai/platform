onetype.EmitRegister('ui.apps.close', {
	description: 'Fired after the active app closes and none is selected.',
	metadata: { addon: 'ui.apps' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the app that was closed.'
		}
	}
});
