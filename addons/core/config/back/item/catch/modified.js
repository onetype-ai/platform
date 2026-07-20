import config from '#config/addon.js';

config.ItemOn('modified', () =>
{
	config.Fn('write');
});
