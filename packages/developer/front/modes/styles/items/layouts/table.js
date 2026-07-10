onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'developer-styles-table',
		isActive: true,
		condition: { app: ['developer'], mode: ['styles'] },
		zone: 'root',
		slot: 'center',
		config: {
			'developer_styles_tab': {
				type: 'string',
				value: 'variables',
				options: ['variables', 'classes'],
				description: 'Active view of the styles table.'
			}
		},
		render: function()
		{
			this.columns = [
				{ key: 'token', label: 'Token' },
				{ key: 'value', label: 'Value' },
				{ key: 'group', label: 'Group', align: 'right', badge: true }
			];

			this.tabs = [
				{ id: 'variables', label: 'Variables', icon: 'data_object' },
				{ id: 'classes', label: 'Classes', icon: 'css' }
			];

			this.pick = ({ value }) =>
			{
				$ot.ui.layouts.data({ developer_styles_tab: value });
			};

			this.members = [
				{ key: 'token', label: 'Token' },
				{ key: 'value', label: 'Value' }
			];

			this.rows = () =>
			{
				const kind = this.developer_styles_tab === 'classes' ? 'class' : 'variable';
				const groups = [];

				for(const row of developer.Fn('styles.list').filter((entry) => entry.kind === kind))
				{
					let group = groups.find((entry) => entry.token === row.group);

					if(!group)
					{
						group = { token: row.group, value: '', group: row.group, groupColor: row.groupColor, table: { columns: this.members, rows: [] } };
						groups.push(group);
					}

					group.table.rows.push({ token: row.token, value: row.value });
				}

				for(const group of groups)
				{
					group.value = group.table.rows.length + ' tokens';
				}

				return groups;
			};

			return `
				<div class="ot-flex-vertical ot-gap-l ot-container-m ot-py-l">
					<e-global-heading
						eyebrow="Developer"
						title="Styles"
						description="Every variable and utility class the framework ships, read live from the stylesheet."
						element="h2"
					></e-global-heading>
					<div>
						<e-navigation-tabs tone="contained" :items="tabs" :active="developer_styles_tab" :_change="pick"></e-navigation-tabs>
					</div>
					<div class="ot-flex-1 ot-scrollbar">
						<e-data-table :columns="columns" :rows="rows()"></e-data-table>
					</div>
				</div>
			`;
		}
	});
});
