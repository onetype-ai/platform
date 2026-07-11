ui.screens.Fn('open', function(id)
{
	const item = this.ItemGet(id);

	if(!item || $ot.ui.screens.active()?.Get('id') === id)
	{
		return false;
	}

	if($ot.ui.apps.active())
	{
		ui.apps.Fn('close');
	}

	$ot.modules.settings.set('ui.screens.active', id);

	if(item.Get('route') && window.location.pathname !== item.Get('route'))
	{
		history.replaceState(null, '', item.Get('route'));
	}

	onetype.Emit('ui.screens.open', { id });

	return true;
});
