ui.apps.Fn('close', function()
{
	const active = $ot.ui.apps.active();

	if(!active)
	{
		return false;
	}

	if(active.Get('onDeactivate'))
	{
		active.Get('onDeactivate')(active);
	}

	const screen = $ot.ui.screens.active();

	if(screen && screen.Get('app') === active.Get('id'))
	{
		ui.screens.Fn('close');
	}

	$ot.modules.settings.set('ui.apps.active', null);

	onetype.Emit('ui.apps.close', { id: active.Get('id') });

	return true;
});
