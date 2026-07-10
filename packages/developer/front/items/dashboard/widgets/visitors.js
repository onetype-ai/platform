onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'developer-visitors',
		title: 'Visitors',
		description: 'Last 30 days',
		icon: 'group',
		color: 'blue',
		type: 'numbers',
		section: 'developer-traffic',
		span: 3,
		condition: { app: ['developer'] },
		data: {
			metrics: [
				{ label: 'Unique visitors', value: '48,215', delta: '+12%', direction: 'up' }
			]
		}
	});
});
