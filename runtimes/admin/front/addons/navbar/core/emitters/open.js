onetype.EmitRegister('ui.navbar.open', {
	description: 'Fired after a navbar item surface opens.',
	metadata: { addon: 'ui.navbar' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the item that opened.'
		}
	}
});
