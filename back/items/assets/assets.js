import assets from '@onetype/framework/assets';
import { resolve } from 'path';

const root = resolve(import.meta.dirname, '..', '..', '..');

assets.Fn('import', ['framework', 'styles'], 100);
assets.Fn('import', ['commands'], 200);
assets.Fn('import', ['database'], 300);
assets.Fn('import', [
    'elements',
    'elements/items',
    'pages',
    'directives',
    'directives/items',
    'float',
    'cloudflare/images',
    'actions',
    'sources',
    'variables'
], 400);

assets.Item({ type: 'js', order: 500, path: resolve(root, 'front') });
assets.Item({ type: 'css', order: 500, path: resolve(root, 'front') });

assets.Fn('import', ['boot'], 600);