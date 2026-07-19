commands.Item({
	id: 'ui:apps:open',
	exposed: true,
	description: 'Open an app by id. Deactivates the current app, persists the new one as active, runs its activate hook and emits ui.apps.open. Does nothing when the app is already active.',
	metadata: { addon: 'ui.apps' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the app to open. Must match a registered, currently visible app item.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the app that is now active.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = ui.apps.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'App ' + properties.id + ' not found.', 404);
		}

		if(!item.Fn('visible'))
		{
			return resolve(null, 'App ' + properties.id + ' is not visible right now.', 400);
		}

		const changed = ui.apps.Fn('open', properties.id);

		if(!changed)
		{
			return resolve({ id: properties.id }, 'App ' + properties.id + ' is already active.');
		}

		resolve({ id: properties.id }, 'App ' + properties.id + ' is now active.');
	}
});
