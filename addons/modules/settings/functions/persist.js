modules.settings.Fn('persist', function()
{
	if(onetype.iframe)
	{
		return {};
	}

	const data = {};

	Object.values(this.Items()).forEach((item) =>
	{
		if(item.Get('storage') === 'local')
		{
			data[item.Get('id')] = item.Get('value');
		}
	});

	localStorage.setItem('onetype.settings', JSON.stringify(data));

	return data;
});
