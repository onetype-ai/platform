onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'system',
		condition: { app: ['cms'] },
		order: 3,
		icon: 'settings',
		name: 'System'
	});
});
