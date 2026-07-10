onetype.AddonReady('ui.apps', (apps) =>
{
	apps.Item({
		id: 'developer',
		name: 'Developer',
		icon: 'code',
		color: 'rgba(56, 189, 248, 1)',
		description: 'Developer tools: browse elements with live previews, inspect addons and their commands, and read every style token.',
		order: 9,
		isVisible: false
	});
});
