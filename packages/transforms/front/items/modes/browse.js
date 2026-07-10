onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'browse',
		condition: { app: ['transforms'] },
		isDefault: true,
		order: 1,
		icon: 'explore',
		name: 'Browse'
	});
});
