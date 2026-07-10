onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'addons',
		condition: { app: ['developer'] },
		order: 2,
		icon: 'extension',
		name: 'Addons'
	});
});
