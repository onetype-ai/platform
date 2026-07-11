onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'manage',
		condition: { app: ['cms'] },
		order: 2,
		icon: 'schema',
		name: 'Manage'
	});
});
