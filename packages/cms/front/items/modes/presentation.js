onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'presentation',
		condition: { app: ['cms'] },
		isDefault: true,
		order: 1,
		icon: 'web',
		name: 'Presentation'
	});
});
