onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'canvas',
		isActive: true,
		condition: { app: ['builder'] },
		zone: 'root',
		slot: 'center',
		render: `<e-canvas></e-canvas>`
	});
});
