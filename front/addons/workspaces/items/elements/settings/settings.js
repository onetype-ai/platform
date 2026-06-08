elements.ItemAdd({
	id: 'workspace-settings',
	icon: 'settings',
	name: 'Workspace Settings',
	description: 'Settings form for a single workspace.',
	category: 'Workspaces',
	author: 'OneType',
	metadata: { addon: 'workspaces' },
	config: {
		workspace: {
			type: 'string',
			value: ''
		},
		_close: {
			type: 'function'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			const item = workspaces.ItemGet(this.workspace);

			this.values = { name: item ? item.Get('name') : '' };
		});

		this.sections = [
			{
				columns: 1,
				fields: [
					{
						key: 'name',
						element: 'form-input',
						label: 'Name',
						properties: { placeholder: 'Workspace name' }
					}
				]
			}
		];

		this.save = ({ value }) =>
		{
			const item = workspaces.ItemGet(this.workspace);

			if(item && value.name)
			{
				item.Set('name', value.name);
			}

			this._close && this._close();
		};

		this.section = { background: '', variant: [] };

		return `
			<e-core-builder
				:values="values"
				:sections="sections"
				:section="section"
				:save="'Save changes'"
				:_save="save"
			></e-core-builder>
		`;
	}
});
