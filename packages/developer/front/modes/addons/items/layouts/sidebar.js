onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'developer-addons-sidebar',
		isActive: true,
		condition: { app: ['developer'], mode: ['addons'] },
		zone: 'root',
		slot: 'left',
		render: function()
		{
			this.Compute(() =>
			{
				this.tree = developer.Fn('addons.list').map((group) => ({
					label: group.group,
					items: group.items.map((item) => ({ icon: 'extension', label: item.name, value: item.id }))
				}));
			});

			this.pick = ({ value }) =>
			{
				value.value && $ot.ui.layouts.data({ developer_addons_selected: value.value });
			};

			return `<e-navigation-sidebar title="Addons" :search="true" :items="tree" :active="developer_addons_selected" :_click="pick"></e-navigation-sidebar>`;
		}
	});
});
