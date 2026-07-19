/* TEMP DEMO — shows the stack layout until the bridge app gets its real canvas. */

onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'bridge-canvas',
		isActive: true,
		condition: { app: ['bridge'] },
		zone: 'root',
		slot: 'center',
		render: `<e-canvas layout="stack"></e-canvas>`
	});
});
