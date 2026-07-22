import packages from '#packages/addon.js';

packages.FnExpose('limits', function(slug)
{
    return this.one(slug)?.Get('limits');
});
