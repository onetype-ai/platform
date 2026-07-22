import packages from '#packages/addon.js';

packages.Fn('item.disable', function(item)
{
    item.Set('status', 'disabled');
});
