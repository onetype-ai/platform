onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'ui.layouts.active',
		label: 'Layout open state',
		default: {},
		metadata: { addon: 'ui.layouts' },
		description: 'Persisted open state per layout item, keyed by item id.'
	});
});
