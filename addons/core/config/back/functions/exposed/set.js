import config from '#config/addon.js';

config.FnExpose('set', function(id, value)
{
    const item = this.one(id);

    if(!item)
    {
        return false;
    }

    item.Set('value', value);

    onetype.Emit('platform.config.set', { id, value });

    return true;
});
