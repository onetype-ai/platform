onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'ui.canvas.state',
		label: 'Canvas state',
		default: {},
		metadata: { addon: 'ui.canvas' },
		description: 'Persisted item positions on the canvas, keyed by item id.'
	});
});
