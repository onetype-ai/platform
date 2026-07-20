import config from '#config/addon.js';

config.FnExpose('one', function(key)
{
	return Object.values(this.Items()).find((item) => item.Get('key') === key);
});
