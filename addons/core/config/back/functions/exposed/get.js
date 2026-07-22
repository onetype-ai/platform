import config from '#config/addon.js';

config.FnExpose('get', function(id)
{
    const item = this.one(id);

    return item ? item.Get('value') : null;
});
