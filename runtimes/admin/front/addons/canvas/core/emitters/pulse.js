onetype.EmitRegister('ui.canvas.pulse', {
	description: 'Fired when a pulse travels the connection line between two linked canvas items. The canvas animates a dot along the line.',
	metadata: { addon: 'ui.canvas' },
	config: {
		from: {
			type: 'string',
			description: 'ID of the source item.'
		},
		to: {
			type: 'string',
			description: 'ID of the target item.'
		},
		color: {
			type: 'string',
			description: 'Pulse color token, one of brand, blue, red, orange, green. Empty inherits the line color.'
		}
	}
});
