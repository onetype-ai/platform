onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.sections.Item({
		id: 'developer-traffic',
		title: 'Traffic',
		description: 'How the demo site performs.',
		icon: 'monitoring',
		color: 'blue',
		order: 1,
		condition: { app: ['developer'] }
	});
});
