onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'manage',
		condition: { app: ['cms'] },
		order: 3,
		icon: 'schema',
		name: 'Manage'
	});
});
