import config from '#config/addon.js';

config.ItemOn('added', (item) =>
{
	const value = item.Fn('value');

	if(JSON.stringify(value) !== JSON.stringify(item.Get('value')))
	{
		item.Set('value', value);
	}
});
