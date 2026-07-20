import config from '#config/addon.js';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

config.Fn('write', function()
{
	const data = {};

	for(const item of Object.values(this.Items()))
	{
		data[item.Get('key')] = item.Get('value');
	}

	writeFileSync(resolve(process.cwd(), 'onetype-config.json'), JSON.stringify(data, null, '\t') + '\n');
});
