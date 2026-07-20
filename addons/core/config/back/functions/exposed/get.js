import config from '#config/addon.js';

config.FnExpose('get', function(key)
{
	const item = this.one(key);

	return item ? item.Get('value') : null;
});
