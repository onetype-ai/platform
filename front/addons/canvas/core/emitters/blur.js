onetype.EmitRegister('ui.canvas.blur', {
	description: 'Fired after canvas focus ends and the camera flies back to the view it had before the item was focused.',
	metadata: { addon: 'ui.canvas' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the item that lost focus.'
		}
	}
});
