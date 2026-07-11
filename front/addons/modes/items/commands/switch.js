commands.Item({
	id: 'ui:modes:switch',
	exposed: true,
	description: 'Switch the current mode. Deactivates the visible active modes, activates the given one, persists the change, runs the activate hook and emits ui.modes.switch. Does nothing when the mode is already the current one. Active modes that are not visible stay active, they take over again once visible.',
	metadata: { addon: 'ui.modes' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the mode to switch to. Must match a registered, currently visible mode item.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the mode that is now active.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = ui.modes.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Mode ' + properties.id + ' not found.', 404);
		}

		if(!item.Fn('visible'))
		{
			return resolve(null, 'Mode ' + properties.id + ' is not visible right now.', 400);
		}

		const changed = ui.modes.Fn('switch', properties.id);

		if(!changed)
		{
			return resolve({ id: properties.id }, 'Mode ' + properties.id + ' is already active.');
		}

		resolve({ id: properties.id }, 'Mode ' + properties.id + ' is now active.');
	}
});
