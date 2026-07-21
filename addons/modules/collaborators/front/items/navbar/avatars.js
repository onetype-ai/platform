onetype.AddonReady('admin.navbar', (navbar) =>
{
	navbar.Item({
		id: 'collaborators',
		order: 10,
		position: 'right',
		render: () => `<e-collaborators-avatars></e-collaborators-avatars>`
	});
});
