import config from '#config/addon.js';
import packages from '#packages/addon.js';

packages.Fn('config.save', function()
{
    const value = Object.values(this.Items()).map((item) => ({
        slug: item.Get('slug'),
        status: item.Get('status') === 'disabled' ? 'disabled' : 'enabled',
        version: item.Get('version')
    }));

    config.one('packages').Set('value', value);
});
