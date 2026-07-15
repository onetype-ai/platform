import onetype from '@onetype/framework';
import packages from '#packages/addon.js';
import assets from '@onetype/framework/assets';
import { existsSync } from 'fs';
import { join } from 'path';

packages.Fn('assets', function(type)
{
	const files = [];

	for(const item of this.Fn('order'))
	{
		if(item.Get('status') !== 'enabled')
		{
			continue;
		}

		for(const directory of ['shared', 'front'])
		{
			const path = join(item.Get('path'), directory);

			if(existsSync(path))
			{
				files.push(...assets.Fn('scan.files', path, type));
			}
		}
	}

	return assets.Fn('utils.read', files).join('\n');
});
