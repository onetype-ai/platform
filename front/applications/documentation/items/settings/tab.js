onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'documentation.tab',
		default: {},
		type: 'object',
		persist: true,
		description: 'Active documentation tab per inspected addon.'
	});
});
