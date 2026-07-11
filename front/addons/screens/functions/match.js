ui.screens.Fn('match', function(path)
{
	for(const item of Object.values(this.Items()))
	{
		for(const route of [].concat(item.Get('route') || []))
		{
			const result = onetype.RouteMatch(route, path);

			if(result.match)
			{
				return { item, parameters: result.params };
			}
		}
	}

	return null;
});
