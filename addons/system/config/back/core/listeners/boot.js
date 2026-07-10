import onetype from '@onetype/framework';
import config from '#config/addon.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

onetype.MiddlewareIntercept('boot', async (middleware) =>
{
	const raw = readFileSync(resolve(import.meta.dirname, '..', '..', '..', '..', '..', '..', 'config.json'), 'utf8');

	config.Item({ id: 'kernel', ...JSON.parse(raw) });

	await middleware.next();
});
