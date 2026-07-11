onetype.EmitRegister('ui.canvas.jump', {
	description: 'Fired after the camera centers on one canvas item, through the ui:canvas:jump command or the quick jump search.',
	metadata: { addon: 'ui.canvas' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the centered item.'
		}
	}
});
