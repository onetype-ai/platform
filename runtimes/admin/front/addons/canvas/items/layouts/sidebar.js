onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'sidebar',
		isActive: true,
		condition: { app: ['builder'] },
		zone: 'root',
		slot: 'left',
		render: `<div style="width: 260px; height: 100%; background: var(--ot-bg-2); border-right: 1px solid var(--ot-bg-2-border);"></div>`
	});
});
