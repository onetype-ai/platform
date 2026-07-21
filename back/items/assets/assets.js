import assets from '@onetype/framework/assets';
import { resolve } from 'path';
import { readdirSync } from 'fs';

const root = resolve(import.meta.dirname, '..', '..', '..');

assets.Fn('import', ['framework'], 100);
assets.Fn('import', ['commands'], 200);
assets.Fn('import', ['database'], 300);
assets.Fn('import', [
	'elements',
	'pages',
	'directives',
	'float'
], 400);

const front = resolve(root, 'front');

assets.Item({ type: 'js', order: 500, path: resolve(front, 'core') });

assets.Item({ type: 'js', order: 540, path: front, ignore: [resolve(front, 'core')] });

const core = resolve(root, 'addons', 'core');

for(const name of readdirSync(core, { withFileTypes: true }))
{
	if(!name.isDirectory() || ['settings', 'users', 'tokens'].includes(name.name))
	{
		continue;
	}

	assets.Item({ type: 'js', order: 550, path: resolve(core, name.name), ignore: [resolve(core, name.name, 'back')] });
	assets.Item({ type: 'css', order: 550, path: resolve(core, name.name), ignore: [resolve(core, name.name, 'back')] });
}

