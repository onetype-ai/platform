import config from '#config/addon.js';

config.FnExpose('many', function()
{
	return Object.values(this.Items());
});
