onetype.EmitRegister('ui.modes.switch', {
	description: 'Fired after the active mode changes. Not fired when switching to the mode that is already active.',
	metadata: { addon: 'ui.modes' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the mode that became active.'
		}
	}
});
