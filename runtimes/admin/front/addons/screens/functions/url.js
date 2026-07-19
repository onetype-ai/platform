ui.screens.Fn('url', function(item)
{
	const routes = [].concat(item.Get('route') || []);

	if(!routes.length)
	{
		return null;
	}

	const values = $ot.modules.settings.get('ui.screens.parameters', {});
	const filled = (route) => (route.match(/:(\w+)/g) || []).every((parameter) => values[parameter.slice(1)] !== null && values[parameter.slice(1)] !== undefined && values[parameter.slice(1)] !== '');
	const pattern = routes.findLast(filled);

	return pattern ? onetype.RouteBuild(pattern, values) : null;
});
