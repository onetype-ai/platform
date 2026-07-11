onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'ui.layouts.data',
		label: 'Layout data',
		default: {},
		metadata: { addon: 'ui.layouts' },
		description: 'Persisted global render data, shared across every layout item and validated against the merged item config.'
	});
});
