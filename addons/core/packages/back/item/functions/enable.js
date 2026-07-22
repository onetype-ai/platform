import packages from '#packages/addon.js';

packages.Fn('item.enable', function(item)
{
    item.Set('status', 'enabled');
});
