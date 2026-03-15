import assets from '@onetype/framework/assets';
import { resolve } from 'path';

const root = resolve(import.meta.dirname, '..', '..', '..');

assets.Fn('import', ['framework', 'styles']);
assets.Fn('import', ['commands']);
assets.Fn('import', ['database']);
assets.Fn('import', ['ai']);
assets.Fn('import', [
    'elements',
    'elements/items',
    'pages',
    'directives',
    'directives/items',
    'float'
]);

assets.Item({ type: 'js', order: 10, path: resolve(root, 'front') });
assets.Item({ type: 'css', order: 10, path: resolve(root, 'front') });
