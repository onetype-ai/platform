onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'developer-sources',
		title: 'Traffic sources',
		icon: 'donut_small',
		type: 'donut',
		section: 'developer-traffic',
		span: 4,
		condition: { app: ['developer'] },
		data: {
			label: 'visits',
			segments: [
				{ name: 'Organic', value: 54, color: 'green' },
				{ name: 'Direct', value: 28, color: 'blue' },
				{ name: 'Social', value: 18, color: 'orange' }
			]
		}
	});
});
