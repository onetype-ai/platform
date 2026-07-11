onetype.AddonReady('ui.apps', (apps) =>
{
	apps.Item({
		id: 'cms',
		name: 'CMS',
		icon: 'database',
		color: 'rgba(52, 211, 153, 1)',
		description: 'Content management on top of the universal database. Define collections, manage entries and publish content any package can consume.',
		order: 1
	});
});
