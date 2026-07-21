import packages from '#packages/addon.js';

onetype.MiddlewareIntercept('platform.boot', async (middleware) =>
{
	await packages.Fn('sync');
	await packages.Fn('load');

	const list = {};

	for(const item of Object.values(packages.Items()))
	{
		list[item.Get('slug')] = item.Get(['slug', 'name', 'version', 'description', 'icon', 'color', 'core', 'depends', 'runtimes', 'status', 'message', 'permissions', 'features', 'config', 'limits']);
	}

	$ot.set('packages', list);

	await middleware.next();
});
