commands.Item({
	id: 'ui:screens:close',
	exposed: true,
	description: 'Close the active screen, restore the root route and emit ui.screens.close. The normal shell layouts take over again.',
	metadata: { addon: 'ui.screens' },
	in: {},
	out: {
		id: {
			type: 'string',
			description: 'ID of the screen that was closed.'
		}
	},
	callback: function(properties, resolve)
	{
		const active = $ot.ui.screens.active();

		if(!active)
		{
			return resolve(null, 'No screen is open.', 400);
		}

		ui.screens.Fn('close');

		resolve({ id: active.Get('id') }, 'Screen ' + active.Get('id') + ' is closed.');
	}
});
