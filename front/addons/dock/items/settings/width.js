onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'ui.dock.width',
		label: 'Panel width',
		default: 380,
		metadata: { addon: 'ui.dock' },
		description: 'Width in pixels of the open dock item panel, resized by dragging its edge.'
	});
});
