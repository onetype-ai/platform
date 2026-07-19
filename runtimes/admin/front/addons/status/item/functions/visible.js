ui.status.Fn('item.visible', function(item)
{
	if(!item.Get('active'))
	{
		return false;
	}

	const app = $ot.modules.settings.get('ui.apps.active', 'builder');
	const apps = item.Get('app');

	if(apps.length && !apps.includes(app))
	{
		return false;
	}

	const list = item.Get('mode');

	if(list.length && !list.includes($ot.ui.modes.active()?.Get('id')))
	{
		return false;
	}

	return true;
});
