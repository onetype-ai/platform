import onetype from '@onetype/framework';
import packages from '#packages/addon.js';

onetype.MiddlewareIntercept('boot', async (middleware) =>
{
	packages.Fn('scan');

	await middleware.next();
});
