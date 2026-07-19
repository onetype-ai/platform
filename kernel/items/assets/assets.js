import assets from '@onetype/framework/assets';
import { resolve } from 'path';
import { readdirSync } from 'fs';

const root = resolve(import.meta.dirname, '..', '..', '..');

assets.Fn('import', ['framework', 'styles'], 100);
assets.Fn('import', ['commands'], 200);
assets.Fn('import', ['database'], 300);
assets.Fn('import', [
	'elements',
	'pages',
	'directives',
	'directives/items',
	'float',
	'ai',
	'cloudflare/images',
	'actions',
	'sources',
	'variables'
], 400);

const shell = resolve(root, 'runtimes', 'admin', 'front');

assets.Item({ type: 'css', order: 110, path: resolve(shell, 'styles') });

assets.Item({ type: 'js', order: 450, path: resolve(shell, 'items') });
assets.Item({ type: 'css', order: 450, path: resolve(shell, 'items') });

assets.Item({ type: 'js', order: 500, path: resolve(shell, 'core') });

assets.Item({ type: 'js', order: 540, path: shell, ignore: [resolve(shell, 'addons'), resolve(shell, 'styles'), resolve(shell, 'items'), resolve(shell, 'core')] });

assets.Item({ type: 'js', order: 550, path: resolve(shell, 'addons') });
assets.Item({ type: 'css', order: 550, path: resolve(shell, 'addons') });

const addons = resolve(root, 'addons');

assets.Item({ type: 'js', order: 550, path: resolve(addons, 'modules') });
assets.Item({ type: 'css', order: 550, path: resolve(addons, 'modules') });

assets.Item({ type: 'js', order: 550, path: resolve(addons, 'other') });
assets.Item({ type: 'css', order: 550, path: resolve(addons, 'other') });

for(const category of ['system', 'workspace'])
{
	for(const name of readdirSync(resolve(addons, category), { withFileTypes: true }))
	{
		if(!name.isDirectory())
		{
			continue;
		}

		assets.Item({ type: 'js', order: 550, path: resolve(addons, category, name.name, 'front') });
		assets.Item({ type: 'css', order: 550, path: resolve(addons, category, name.name, 'front') });
	}
}

assets.Fn('import', ['boot'], 99999);
