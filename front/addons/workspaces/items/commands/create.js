commands.Item({
	id: 'workspaces:create',
	exposed: true,
	description: 'Create a new workspace and switch to it',
	metadata: { addon: 'workspaces' },
	in: {
		name: {
			type: 'string',
			required: false,
			description: 'Workspace name. Defaults to "Workspace N".'
		}
	},
	out: {
		id: ['string']
	},
	callback: function(properties, resolve)
	{
		const id = 'workspace-' + onetype.GenerateUID();
		const name = properties.name || 'Workspace ' + (Object.keys(workspaces.Items()).length + 1);

		workspaces.Item({ id, name });

		settings.Fn('set', 'workspaces.active', id);

		onetype.Emit('workspaces.switch', id);

		resolve({ id });
	}
});
