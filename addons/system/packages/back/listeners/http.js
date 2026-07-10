import onetype from '@onetype/framework';
import packages from '#packages/addon.js';

onetype.MiddlewareIntercept('servers.http.request', async (middleware) =>
{
	const http = middleware.value;

	http.state.packages = packages.Fn('list');

	await middleware.next();
});
