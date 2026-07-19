/* TEMP DEMO — shows a flow design until the workflows app gets its real canvas. */

onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'workflows-canvas',
		isActive: true,
		condition: { app: ['workflows'] },
		zone: 'root',
		slot: 'center',
		render: `<e-canvas></e-canvas>`
	});
});
