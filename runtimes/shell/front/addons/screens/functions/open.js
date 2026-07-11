ui.screens.Fn('open', function(id, parameters = {})
{
	const item = this.ItemGet(id);

	if(!item)
	{
		return false;
	}

	const values = {};

	for(const [parameter, key] of Object.entries(item.Get('params')))
	{
		if(parameters[parameter] !== undefined)
		{
			values[key] = parameters[parameter];
		}
	}

	if(Object.keys(values).length)
	{
		ui.layouts.Fn('data', values);
	}

	if($ot.ui.screens.active()?.Get('id') === id)
	{
		return false;
	}

	$ot.modules.settings.set('ui.screens.active', id);

	if(item.Get('app'))
	{
		ui.apps.Fn('open', item.Get('app'));
	}
	else if($ot.ui.apps.active())
	{
		ui.apps.Fn('close');
	}

	if(item.Get('mode'))
	{
		ui.modes.Fn('switch', item.Get('mode'));
	}

	const url = this.Fn('url', item);

	if(url && window.location.pathname !== url)
	{
		history.replaceState(null, '', url);
	}

	onetype.Emit('ui.screens.open', { id });

	return true;
});
