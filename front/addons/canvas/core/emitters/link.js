onetype.EmitRegister('ui.canvas.link', {
	description: 'Fired after a connection arrow is drawn between two canvas items, through the ui:canvas:link command or an interactive port drag.',
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
