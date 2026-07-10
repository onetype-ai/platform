commands.Item({
	id: 'ui:explorer:run',
	exposed: true,
	description: 'Run an explorer entry by id, the same as selecting it in the search results. Emits ui.explorer.run.',
	metadata: { addon: 'ui.explorer' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the entry to run. Must match a registered explorer entry.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the entry that ran.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = ui.explorer.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Entry ' + properties.id + ' not found.', 404);
		}

		item.Get('callback')();

		onetype.Emit('ui.explorer.run', { id: properties.id });

		resolve({ id: properties.id }, 'Entry ' + properties.id + ' executed.');
	}
});
