import packages from '#packages/addon.js';
import { existsSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';

packages.Fn('back', async function()
{
	for(const item of this.Fn('order'))
	{
		if(item.Get('status') !== 'enabled')
		{
			continue;
		}

		for(const file of [join(item.Get('path'), 'shared', 'load.js'), join(item.Get('path'), 'back', 'load.js')])
		{
			if(existsSync(file))
			{
				await import(pathToFileURL(file));
			}
		}
	}
});
