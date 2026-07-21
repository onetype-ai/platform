import packages from '#packages/addon.js';

onetype.MiddlewareIntercept('servers.http.request', async (middleware) =>
{
	const http = middleware.value;

	http.state.packages = $ot.get('packages');

	await middleware.next();
});
