onetype.EmitRegister('ui.dock.click', {
	description: 'Fired when a dock item is clicked, before its own click or open/close runs.',
	metadata: { addon: 'ui.dock' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the item that was clicked.'
		}
	}
});
