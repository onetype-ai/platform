onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'developer-elements-sidebar',
		isActive: true,
		condition: { app: ['developer'], mode: ['elements'] },
		zone: 'root',
		slot: 'left',
		render: function()
		{
			this.Compute(() =>
			{
				this.tree = developer.Fn('elements.list').map((group) => ({
					label: group.category,
					items: group.items.map((item) => ({ icon: item.icon, label: item.name, value: item.id }))
				}));
			});

			this.pick = ({ value }) =>
			{
				value.value && $ot.ui.layouts.data({ developer_elements_selected: value.value });
			};

			return `<e-navigation-sidebar title="Elements" :search="true" :items="tree" :active="developer_elements_selected" :_click="pick"></e-navigation-sidebar>`;
		}
	});
});
