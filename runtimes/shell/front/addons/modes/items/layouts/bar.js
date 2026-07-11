onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'modes-bar',
		isActive: true,
		zone: 'root',
		slot: 'bottom',
		order: 1000,
		render: `<e-modes-bar></e-modes-bar>`
	});
});
