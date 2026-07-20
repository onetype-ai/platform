import assets from '@onetype/framework/assets';
import runtimes from '#runtimes/addon.js';
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

const front = resolve(root, 'front');

assets.Item({ type: 'css', order: 110, path: resolve(front, 'styles') });

assets.Item({ type: 'js', order: 500, path: resolve(front, 'core') });

assets.Item({ type: 'js', order: 540, path: front, ignore: [resolve(front, 'styles'), resolve(front, 'core')] });

/* Runtimes register from packages during boot, so their module
   assets join here as items arrive, not at import. */
const registered = new Set();

runtimes.ItemOn('add', (item) =>
{
	for(const name of item.Get('modules'))
	{
		if(registered.has('module.' + name))
		{
			continue;
		}

		registered.add('module.' + name);

		assets.Item({ type: 'js', order: 550, path: resolve(root, 'addons', 'modules', name, 'front') });
		assets.Item({ type: 'css', order: 550, path: resolve(root, 'addons', 'modules', name, 'front') });
	}
});

const core = resolve(root, 'addons', 'core');

for(const name of readdirSync(core, { withFileTypes: true }))
{
	if(!name.isDirectory() || ['persistence', 'settings', 'users', 'tokens'].includes(name.name))
	{
		continue;
	}

	assets.Item({ type: 'js', order: 550, path: resolve(core, name.name), ignore: [resolve(core, name.name, 'back')] });
	assets.Item({ type: 'css', order: 550, path: resolve(core, name.name), ignore: [resolve(core, name.name, 'back')] });
}

assets.Fn('import', ['boot'], 99999);
