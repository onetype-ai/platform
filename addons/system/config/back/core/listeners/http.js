import onetype from '@onetype/framework';
import config from '#config/addon.js';

onetype.MiddlewareIntercept('servers.http.request', async (middleware) =>
{
	middleware.value.state.config = config.Fn('get');

	await middleware.next();
});
