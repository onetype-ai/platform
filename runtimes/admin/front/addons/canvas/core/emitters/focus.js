onetype.EmitRegister('ui.canvas.focus', {
	description: 'Fired after a canvas item takes focus and the camera flies in until the item fills the viewport.',
	metadata: { addon: 'ui.canvas' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the focused item.'
		}
	}
});
