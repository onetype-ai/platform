onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'ui.dock.open',
		label: 'Open dock item',
		default: null,
		metadata: { addon: 'ui.dock' },
		description: 'ID of the dock item whose render is open, or null when none is open.'
	});
});
