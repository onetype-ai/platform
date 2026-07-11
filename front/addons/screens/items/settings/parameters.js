onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'ui.screens.parameters',
		label: 'Screen parameters',
		default: {},
		metadata: { addon: 'ui.screens' },
		description: 'Route parameters of the open screen, kept so the screen restores completely on the next load.'
	});
});
