commands.Item({
	id: 'workspaces:switch',
	exposed: true,
	description: 'Switch the active workspace',
	metadata: { addon: 'workspaces' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'Workspace ID to switch to'
		}
	},
	out: {
		id: ['string']
	},
	callback: function(properties, resolve)
	{
		const item = workspaces.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Workspace :id: not found.', 404, {id: properties.id});
		}

		settings.Fn('set', 'workspaces.active', item.Get('id'));

		onetype.Emit('workspaces.switch', item.Get('id'));

		resolve({ id: item.Get('id') });
	}
});
