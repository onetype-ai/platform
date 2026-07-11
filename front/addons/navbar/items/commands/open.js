commands.Item({
	id: 'ui:navbar:open',
	exposed: true,
	description: 'Open the popup of a navbar item. Closes any other open item first, tracks the state and emits ui.navbar.open. Does nothing when the item is already open.',
	metadata: { addon: 'ui.navbar' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the navbar item to open.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the item that is open now.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = ui.navbar.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Navbar item ' + properties.id + ' not found.', 404);
		}

		if(!item.Get('popup'))
		{
			return resolve(null, 'Navbar item ' + properties.id + ' has no popup to open.', 400);
		}

		if($ot.modules.settings.get('ui.navbar.open', null) === properties.id)
		{
			return resolve({ id: properties.id }, 'Navbar item ' + properties.id + ' is already open.');
		}

		if(!ui.navbar.Fn('open', properties.id))
		{
			return resolve(null, 'Navbar item ' + properties.id + ' is not on screen to anchor its dropdown.', 400);
		}

		resolve({ id: properties.id }, 'Navbar item ' + properties.id + ' opened.');
	}
});
