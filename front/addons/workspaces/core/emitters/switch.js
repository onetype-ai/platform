onetype.EmitRegister('workspaces.switch', {
	description: 'Fired when the active workspace changes.',
	metadata: { addon: 'workspaces' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the workspace that was switched to.'
		}
	}
});
