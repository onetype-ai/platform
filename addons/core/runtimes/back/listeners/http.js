import runtimes from '#runtimes/addon.js';

onetype.MiddlewareIntercept('servers.http.request', async (middleware) =>
{
	const http = middleware.value;

	const matched = runtimes.Fn('match', http.url.hostname, http.url.pathname);
	const base = matched && matched.Get('path') !== '/' ? matched.Get('path') : '';

	http.state.runtime = matched ? matched.Get('slug') : null;
	http.state.base = base;

	if(base && http.url.pathname.startsWith(base))
	{
		http.url.pathname = http.url.pathname.slice(base.length) ? http.url.pathname.slice(base.length) : '/';
	}

	await middleware.next();
});
