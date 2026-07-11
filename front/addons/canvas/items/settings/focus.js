onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'ui.canvas.focus',
		label: 'Canvas focus',
		default: null,
		metadata: { addon: 'ui.canvas' },
		description: 'Focused canvas item and the camera to fly back to when focus ends.'
	});
});
