onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'status-panel',
		zone: 'root',
		slot: 'bottom',
		order: 2000,
		render: function()
		{
			return '<e-status-panel :tab="tab"></e-status-panel>';
		}
	});
});
