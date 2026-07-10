commands.Item({
	id: 'ui:apps:close',
	exposed: true,
	description: 'Close the active app so none is selected. Runs the deactivate hook, persists the empty state and emits ui.apps.close. Does nothing when no app is active.',
	metadata: { addon: 'ui.apps' },
	out: {
		id: {
			type: 'string',
			description: 'ID of the app that was closed. Empty when none was active.'
		}
	},
	callback: function(properties, resolve)
	{
		const active = $ot.ui.apps.active();

		if(!active)
		{
			return resolve({ id: '' }, 'No app is active.');
		}

		ui.apps.Fn('close');

		resolve({ id: active.Get('id') }, 'App ' + active.Get('id') + ' closed.');
	}
});
