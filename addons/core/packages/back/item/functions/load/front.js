import assets from '@onetype/framework/assets';
import packages from '#packages/addon.js';
import { join } from 'path';

packages.Fn('item.load.front', function(item)
{
    const order = 10000 + item.Fn('find.order');

    const front = join(item.Get('path'), 'front');

    const condition = function()
    {
        return item.Fn('is.scoped', this.assets.scope);
    };

    assets.Item({ type: 'js', order, path: front, condition });
    assets.Item({ type: 'css', order, path: front, condition });
});