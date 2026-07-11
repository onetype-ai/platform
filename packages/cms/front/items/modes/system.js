onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'system',
		condition: { app: ['cms'] },
		order: 4,
		icon: 'settings',
		name: 'System'
	});
});
