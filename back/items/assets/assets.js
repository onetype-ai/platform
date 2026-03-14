import assets from '@onetype/framework/assets';
import { resolve } from 'path';

const root = resolve(import.meta.dirname, '..', '..', '..');

assets.Fn('import', ['framework', 'styles']);
assets.Fn('import', ['commands']);
assets.Fn('import', ['database']);
assets.Fn('import', ['ai']);
assets.Fn('import', [
    'elements',
    'pages',
    'directives',
    'directives/items'
]);
assets.Fn('import', [
    'elements/status/code',
    'elements/status/empty',
    'elements/global/notice',
    'elements/global/heading',
    'elements/global/menu',
    'elements/form/button',
    'elements/form/checkbox',
    'elements/form/color',
    'elements/form/date',
    'elements/form/field',
    'elements/form/input',
    'elements/form/radio',
    'elements/form/rating',
    'elements/form/section',
    'elements/form/select',
    'elements/form/slider',
    'elements/form/tags',
    'elements/form/textarea',
    'elements/form/toggle',
    'elements/navigation/navbar',
    'elements/navigation/sidebar',
    'elements/navigation/tabs',
    'elements/core/builder',
    'elements/core/repeater'
]);

assets.Item({ type: 'js', order: 10, path: resolve(root, 'front') });
assets.Item({ type: 'css', order: 10, path: resolve(root, 'front') });
