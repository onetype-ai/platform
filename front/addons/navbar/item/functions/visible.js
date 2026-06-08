navbar.Fn('item.visible', function(item)
{
	if(!item.Get('active'))
	{
		return false;
	}

	const apps = item.Get('app');

	if(apps.length && !apps.includes('*') && !apps.includes(settings.Fn('get', 'apps.active', 'builder')))
	{
		return false;
	}

	const list = item.Get('mode');

	if(list.length && !list.includes('*'))
	{
		const app = settings.Fn('get', 'apps.active', 'builder');
		const activeMode = modes.Fn('active', app);

		if(!list.includes(activeMode))
		{
			return false;
		}
	}

	return true;
});
