onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'workspaces.active',
		default: 'editor',
		type: 'string',
		persist: true,
		description: 'The active workspace.'
	});
});
