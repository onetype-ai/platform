onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'ui.modes.active',
		label: 'Active modes',
		default: [],
		metadata: { addon: 'ui.modes' },
		description: 'IDs of the active modes. More than one can be active at a time, only one of them is visible. The visible one is the current mode.'
	});
});
