commands.Item({
	id: 'ui:layouts:close',
	exposed: true,
	description: 'Close a layout item by id. Persists the state and emits ui.layouts.close. An item that is already closed is left alone.',
	metadata: { addon: 'ui.layouts' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the layout item to close.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the layout item.'
		}
	},
	callback: async function(properties, resolve)
	{
		const context = await onetype.Middleware('ui.layouts.close', { properties, cancel: false });

		if(context.value.cancel)
		{
			return resolve(null, 'Layout close cancelled.', 400);
		}

		properties = context.value.properties;

		if(!ui.layouts.ItemGet(properties.id))
		{
			return resolve(null, 'Layout item ' + properties.id + ' not found.', 404);
		}

		const changed = ui.layouts.Fn('close', properties.id);

		if(!changed)
		{
			return resolve({ id: properties.id }, 'Layout ' + properties.id + ' already closed.');
		}

		resolve({ id: properties.id }, 'Layout ' + properties.id + ' closed.');
	}
});
