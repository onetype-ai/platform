onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'settings-content',
		isActive: true,
		condition: { app: ['settings'] },
		zone: 'root',
		slot: 'center',
		render: function()
		{
			return /* html */ `<e-settings-content :group="group" :scope="scope"></e-settings-content>`;
		}
	});
});
