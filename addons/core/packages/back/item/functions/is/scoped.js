import packages from '#packages/addon.js';

packages.Fn('item.is.scoped', function(item, scope)
{
    return this.Fn('scoped', scope).has(item.Get('slug'));
});
