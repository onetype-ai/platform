ui.screens.Fn('open', function(id, parameters = {})
{
	const item = this.ItemGet(id);

	if(!item)
	{
		return false;
	}

	$ot.modules.settings.set('ui.screens.parameters', parameters);

	this.StoreSet('data', item.Get('data') ? item.Get('data').call(parameters) : {});

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
