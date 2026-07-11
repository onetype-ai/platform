onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'ui.canvas.camera',
		label: 'Canvas camera',
		default: { x: 0, y: 0, z: 1 },
		metadata: { addon: 'ui.canvas' },
		description: 'Persisted camera position and zoom of the canvas.'
	});
});
