onetype.EmitRegister('ui.canvas.group', {
	description: 'Fired when a canvas group is registered.',
	metadata: { addon: 'ui.canvas' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the registered group.'
		}
	}
});
