ui.screens.Fn('close', function()
{
	const active = $ot.ui.screens.active();

	if(!active)
	{
		return false;
	}

	$ot.modules.settings.set('ui.screens.active', null);

	if(active.Get('route') && window.location.pathname !== '/')
	{
		history.replaceState(null, '', '/');
	}

	onetype.Emit('ui.screens.close', { id: active.Get('id') });

	return true;
});
