elements.ItemAdd({
	id: 'workspace-tabs',
	icon: 'tab',
	name: 'Workspace Tabs',
	description: 'VS Code style tabs for switching between workspaces.',
	category: 'Workspaces',
	author: 'OneType',
	metadata: { addon: 'workspaces' },
	render: function()
	{
		const refresh = () =>
		{
			this.list = Object.values(workspaces.Items()).map((item) =>
			{
				return { id: item.Get('id'), name: item.Get('name'), icon: item.Get('icon') };
			});

			this.active = settings.Fn('get', 'workspaces.active', null);
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'workspaces' && refresh());
		this.On('@addon.item.modified', (item) => item.addon.GetName() === 'workspaces' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'workspaces' && refresh());
		this.On('workspaces.switch', refresh);

		this.select = (workspace) =>
		{
			if(workspace.id === this.active)
			{
				this.settings(workspace);

				return;
			}

			$ot.command('workspaces:switch', { id: workspace.id });
		};

		this.close = (workspace) =>
		{
			$ot.command('workspaces:close', { id: workspace.id });
		};

		this.create = () =>
		{
			$ot.command('workspaces:create');
		};

		this.settings = (workspace) =>
		{
			$ot.float.panel({
				title: 'Workspace',
				description: workspace.name,
				position: 'right',
				width: 'l',
				content: function()
				{
					this.workspace = workspace.id;

					return `<e-workspace-settings :workspace="workspace" :_close="dismiss"></e-workspace-settings>`;
				}
			});
		};

		return `
			<div class="box">
				<div ot-for="workspace in list" :ot-key="workspace.id" :class="workspace.id === active ? 'tab active' : 'tab'" ot-click="select(workspace)">
					<i>{{ workspace.icon || 'web_asset' }}</i>
					<span class="label">{{ workspace.name }}</span>
				</div>
				<button class="add" :ot-tooltip="{ text: 'Create Workspace', position: { x: 'center', y: 'bottom' } }" ot-click="create">
					<i>add</i>
				</button>
			</div>
		`;
	}
});
