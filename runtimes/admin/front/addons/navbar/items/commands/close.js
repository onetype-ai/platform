commands.Item({
	id: 'ui:navbar:close',
	exposed: true,
	description: 'Close the open navbar item popup. Tracks the state and emits ui.navbar.close. Does nothing when no item is open.',
	metadata: { addon: 'ui.navbar' },
	in: {},
	out: {},
	callback: function(properties, resolve)
	{
		const open = $ot.modules.settings.get('ui.navbar.open', null);

		if(!ui.navbar.Fn('close'))
		{
			return resolve({}, 'No navbar item is open, nothing to close.');
		}

		resolve({}, 'Navbar item ' + open + ' closed.');
	}
});
