onetype.EmitRegister('ui.navbar.click', {
	description: 'Fired when a navbar item is clicked, before its own click or type behavior runs.',
	metadata: { addon: 'ui.navbar' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the item that was clicked.'
		}
	}
});
