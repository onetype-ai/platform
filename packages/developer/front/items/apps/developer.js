onetype.AddonReady('ui.apps', (apps) =>
{
	apps.Item({
		id: 'developer',
		name: 'Developer',
		icon: 'code',
		color: 'rgba(56, 189, 248, 1)',
		description: 'Browse every element, its config and a live preview.',
		order: 9,
		isVisible: false
	});
});
