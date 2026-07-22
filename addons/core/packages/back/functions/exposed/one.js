import packages from '#packages/addon.js';

packages.FnExpose('one', function(slug)
{
    return Object.values(this.Items()).find((item) => item.Get('slug') === slug);
});
