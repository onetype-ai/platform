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

	$ot.modules.settings.set('ui.apps.active', null);

	onetype.Emit('ui.apps.close', { id: active.Get('id') });

	return true;
});
