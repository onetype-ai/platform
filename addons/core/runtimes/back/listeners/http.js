import runtimes from '#runtimes/addon.js';

onetype.MiddlewareIntercept('servers.http.request', async (middleware) =>
{
	const http = middleware.value;

	const matched = runtimes.Fn('match', http.url.hostname, http.url.pathname);

	http.state.runtime = matched ? matched.Get('slug') : null;

	await middleware.next();
});
