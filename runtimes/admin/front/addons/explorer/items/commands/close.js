commands.Item({
	id: 'ui:explorer:close',
	exposed: true,
	description: 'Close the explorer. Emits ui.explorer.close through the overlay teardown. Does nothing when the explorer is already closed.',
	metadata: { addon: 'ui.explorer' },
	in: {},
	out: {},
	callback: function(properties, resolve)
	{
		const changed = ui.explorer.Fn('close');

		if(!changed)
		{
			return resolve({}, 'Explorer is already closed.');
		}

		resolve({}, 'Explorer closed.');
	}
});
