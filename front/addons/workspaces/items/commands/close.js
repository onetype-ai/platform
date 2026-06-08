commands.Item({
	id: 'workspaces:close',
	exposed: true,
	description: 'Close a workspace',
	metadata: { addon: 'workspaces' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'Workspace ID to close'
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

		const ids = Object.keys(workspaces.Items());

		if(ids.length <= 1)
		{
			return resolve(null, 'Cannot close the last workspace.', 400, {});
		}

		const active = settings.Fn('get', 'workspaces.active', null);

		workspaces.ItemRemove(properties.id);

		if(active === properties.id)
		{
			const next = Object.keys(workspaces.Items())[0];

			settings.Fn('set', 'workspaces.active', next);

			onetype.Emit('workspaces.switch', next);
		}

		resolve({ id: properties.id });
	}
});
