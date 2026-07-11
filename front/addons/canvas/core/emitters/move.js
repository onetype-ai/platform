onetype.EmitRegister('ui.canvas.move', {
	description: 'Fired after canvas items move, through the ui:canvas:move command or the restore on boot.',
	metadata: { addon: 'ui.canvas' },
	config: {
		ids: {
			type: 'array',
			each: { type: 'string' },
			description: 'IDs of the items that moved.'
		}
	}
});
