import config from '#config/addon.js';

config.Fn('get', function(key)
{
	const item = this.ItemGet('kernel');

	if(!item)
	{
		return null;
	}

	return key ? item.Get(key) : item.GetData();
});
