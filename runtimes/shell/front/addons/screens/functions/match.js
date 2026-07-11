ui.screens.Fn('match', function(path)
{
	for(const item of Object.values(this.Items()))
	{
		for(const route of [].concat(item.Get('route') || []))
		{
			const parameters = onetype.RouteMatch(route, path);

			if(parameters)
			{
				return { item, parameters };
			}
		}
	}

	return null;
});
