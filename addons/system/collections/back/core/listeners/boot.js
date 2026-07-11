import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import collections from '../../addon.js';

onetype.MiddlewareIntercept('boot', async (middleware) =>
{
	await database.Fn('ready');

	for(const definition of collections.StoreGet('declared') || [])
	{
		await collections.Fn('sync', definition);
	}

	await middleware.next();
});
