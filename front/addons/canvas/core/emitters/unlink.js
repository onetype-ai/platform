onetype.EmitRegister('ui.canvas.unlink', {
	description: 'Fired after the connection arrow between two canvas items is removed.',
	metadata: { addon: 'ui.canvas' },
	config: {
		from: {
			type: 'string',
			description: 'ID of the source item.'
		},
		to: {
			type: 'string',
			description: 'ID of the target item.'
		}
	}
});
