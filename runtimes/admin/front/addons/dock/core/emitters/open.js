onetype.EmitRegister('ui.dock.open', {
	description: 'Fired after a dock item opens.',
	metadata: { addon: 'ui.dock' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the item that opened.'
		}
	}
});
