onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'ui.screens.active',
		label: 'Active screen',
		default: null,
		metadata: { addon: 'ui.screens' },
		description: 'ID of the open screen, null while the normal shell shows. Cleared on load when the URL does not match the screen route.'
	});
});
