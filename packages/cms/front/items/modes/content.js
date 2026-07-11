onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'content',
		condition: { app: ['cms'] },
		isDefault: true,
		order: 1,
		icon: 'article',
		name: 'Content'
	});
});
