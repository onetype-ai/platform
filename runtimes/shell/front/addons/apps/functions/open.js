ui.apps.Fn('open', function(id)
{
	const item = this.ItemGet(id);

	if(!item)
	{
		return false;
	}

	const previous = $ot.ui.apps.active();

	if(previous?.Get('id') === id)
	{
		return false;
	}

	if(previous && previous.Get('onDeactivate'))
	{
		previous.Get('onDeactivate')(previous);
	}

	const screen = $ot.ui.screens.active();

	if(screen && screen.Get('app') !== id)
	{
		ui.screens.Fn('close');
	}

	$ot.modules.settings.set('ui.apps.active', id);

	if(item.Get('onActivate'))
	{
		item.Get('onActivate')(item);
	}

	onetype.Emit('ui.apps.open', { id });

	return true;
});
