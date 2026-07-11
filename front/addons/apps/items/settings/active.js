onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'ui.apps.active',
		label: 'Active app',
		type: 'select',
		options: () => ui.apps.Fn('list').map((app) => ({ label: app.label, value: app.id })),
		metadata: { addon: 'ui.apps' },
		description: 'The app open on the rail.'
	});
});
