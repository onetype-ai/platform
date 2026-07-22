import packages from '#packages/addon.js';

packages.FnExpose('many', function()
{
    return Object.values(this.Items());
});
