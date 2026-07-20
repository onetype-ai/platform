config.Fn('write', function()
{
	const data = {};

	for(const item of Object.values(this.Items()))
	{
		data[item.Get('key')] = item.Get('value');
	}

	localStorage.setItem('onetype-config', JSON.stringify(data));
});
