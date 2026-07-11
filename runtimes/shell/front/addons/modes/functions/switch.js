ui.modes.Fn('switch', function(id)
{
	const item = this.ItemGet(id);

	if(!item || !item.Fn('visible'))
	{
		return false;
	}

	if($ot.ui.modes.active()?.Get('id') === id)
	{
		return false;
	}

	const active = [...$ot.modules.settings.get('ui.modes.active', [])];

	Object.values(this.Items()).filter((previous) => previous.Fn('visible') && active.includes(previous.Get('id'))).forEach((previous) =>
	{
		active.splice(active.indexOf(previous.Get('id')), 1);

		if(previous.Get('onDeactivate'))
		{
			previous.Get('onDeactivate')(previous);
		}
	});

	active.push(id);

	$ot.modules.settings.set('ui.modes.active', active);

	if(item.Get('onActivate'))
	{
		item.Get('onActivate')(item);
	}

	const screen = $ot.ui.screens.active();

	if(screen && screen.Get('mode') && screen.Get('mode') !== id)
	{
		ui.screens.Fn('close');
	}

	onetype.Emit('ui.modes.switch', { id });

	return true;
});
