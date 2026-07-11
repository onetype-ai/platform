commands.Item({
	id: 'ui:screens:open',
	exposed: true,
	description: 'Open a screen. Replaces the active screen, writes the screen route into the address bar and emits ui.screens.open. Only layouts assigned to the screen stay visible while it is open.',
	metadata: { addon: 'ui.screens' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the screen to open. Must match a registered screen item.'
		},
		parameters: {
			type: 'object',
			value: {},
			description: 'Route parameter values, mapped into the layouts data through the screen params map.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the screen that is now open.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = ui.screens.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Screen ' + properties.id + ' not found.', 404);
		}

		const changed = ui.screens.Fn('open', properties.id, properties.parameters);

		if(!changed)
		{
			return resolve({ id: properties.id }, 'Screen ' + properties.id + ' is already open.');
		}

		resolve({ id: properties.id }, 'Screen ' + properties.id + ' is now open.');
	}
});
