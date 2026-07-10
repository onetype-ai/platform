onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'developer-services',
		title: 'Services',
		icon: 'dns',
		type: 'status',
		section: 'developer-operations',
		span: 4,
		condition: { app: ['developer'] },
		data: {
			items: [
				{ label: 'Edge network', sublabel: '12 regions', value: '28ms', status: 'up' },
				{ label: 'Database', sublabel: 'primary', value: '6ms', status: 'up' },
				{ label: 'Build queue', sublabel: '3 pending', value: 'busy', status: 'warn' },
				{ label: 'Image CDN', sublabel: 'idle', value: '—', status: 'idle' }
			]
		}
	});
});
