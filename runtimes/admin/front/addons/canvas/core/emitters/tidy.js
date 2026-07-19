onetype.EmitRegister('ui.canvas.tidy', {
	description: 'Fired after the ui:canvas:tidy command arranges the visible items. The canvas glides the cards to their new spots on this event.',
	metadata: { addon: 'ui.canvas' },
	config: {
		ids: {
			type: 'array',
			each: { type: 'string' },
			description: 'IDs of the items that were arranged.'
		}
	}
});
