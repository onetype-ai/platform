onetype.AddonReady('navbar', (navbar) =>
{
	navbar.Item({
		id: 'workspace-tabs',
		position: 'center',
		render: () => `<e-workspace-tabs></e-workspace-tabs>`
	});
});
