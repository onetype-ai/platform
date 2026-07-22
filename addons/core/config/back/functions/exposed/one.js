import config from '#config/addon.js';

config.FnExpose('one', function(id)
{
    return this.Item(id);
});
