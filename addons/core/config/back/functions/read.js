import config from '#config/addon.js';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

config.Fn('read', function()
{
	const file = resolve(process.cwd(), 'onetype-config.json');

	return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};
});
