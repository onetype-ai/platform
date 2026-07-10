import onetype from '@onetype/framework';
import packages from '#packages/addon.js';
import assets from '@onetype/framework/assets';
import { existsSync } from 'fs';
import { join } from 'path';

packages.Fn('assets', function(type)
{
	const files = [];

	for(const item of Object.values(this.Items()))
	{
		const front = join(item.Get('path'), 'front');

		if(item.Get('status') !== 'enabled' || !existsSync(front))
		{
			continue;
		}

		files.push(...assets.Fn('scan.files', front, type));
	}

	return assets.Fn('utils.read', files).join('\n');
});
