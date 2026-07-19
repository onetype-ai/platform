commands.Item({
	id: 'ui:layouts:toggle',
	exposed: true,
	silent: true,
	description: 'Toggle a layout item by id. Flips the current state through ui:layouts:open or ui:layouts:close, including persistence and events.',
	metadata: { addon: 'ui.layouts' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the layout item to toggle.'
		},
		data: {
			type: 'object',
			description: 'Prop values passed to the render when opening.'
		}
	},
	out: {
		open: {
			type: 'boolean',
			description: 'Whether the item is open now.'
		}
	},
	callback: async function(properties, resolve)
	{
		const item = ui.layouts.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Layout item ' + properties.id + ' not found.', 404);
		}

		const open = !item.Get('isActive');

		if(open)
		{
			await $ot.command('ui:layouts:open', properties.data ? { id: properties.id, data: properties.data } : { id: properties.id });
		}
		else
		{
			await $ot.command('ui:layouts:close', { id: properties.id });
		}

		resolve({ open }, 'Layout ' + properties.id + ' is now ' + (open ? 'open' : 'closed') + '.');
	}
});
