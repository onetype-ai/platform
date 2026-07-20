import onetype from '@onetype/framework';
import packages from '#packages/addon.js';

onetype.MiddlewareIntercept('boot', async (middleware) =>
{
	$ot.set('packages', packages.Fn('list'));

	await middleware.next();
});
