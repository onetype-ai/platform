ui.screens.Fn('url', function(item)
{
	const routes = [].concat(item.Get('route') || []);

	if(!routes.length)
	{
		return null;
	}

	const data = ui.layouts.Fn('data');
	const values = {};

	for(const [parameter, key] of Object.entries(item.Get('params')))
	{
		const value = data[key];

		if(value !== null && value !== undefined && value !== '')
		{
			values[parameter] = value;
		}
	}

	const pattern = routes.findLast((route) => (route.match(/:(\w+)/g) || []).every((parameter) => values[parameter.slice(1)] !== undefined));

	return pattern ? onetype.RouteBuild(pattern, values) : null;
});
