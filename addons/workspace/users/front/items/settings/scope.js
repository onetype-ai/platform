onetype.AddonReady('modules.settings', (settings) =>
{
	/* AddonReady fires before the settings functions load — the microtask waits
	   for the whole bundle, then registers the scope. */

	queueMicrotask(() =>
	{
		settings.Fn('scope.register', {
			id: 'user',
			label: 'User',
			icon: 'person',
			options: () => Object.values(users.Items()).map((item) =>
			{
				return { label: item.Get('name'), value: item.Get('id') };
			}),
			active: () => 'dejan' /* TEMP until sessions exist */
		});
	});
});
