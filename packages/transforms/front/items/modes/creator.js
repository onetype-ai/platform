onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'creator',
		condition: { app: ['transforms'] },
		order: 2,
		icon: 'draw',
		name: 'Creator'
	});
});
