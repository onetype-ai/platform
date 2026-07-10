onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.sections.Item({
		id: 'developer-operations',
		title: 'Operations',
		description: 'Deploys, services and recent activity.',
		icon: 'dns',
		color: 'green',
		background: 2,
		order: 2,
		condition: { app: ['developer'] }
	});
});
