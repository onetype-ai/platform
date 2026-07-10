onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'ui.navbar.open',
		label: 'Open navbar item',
		default: null,
		storage: 'custom',
		metadata: { addon: 'ui.navbar' },
		description: 'ID of the navbar item whose surface is open, or null when none is open. Not persisted, floating surfaces are ephemeral.'
	});
});
