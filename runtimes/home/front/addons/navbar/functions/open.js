ui.navbar.Fn('open', function(id)
{
	const item = this.ItemGet(id);

	if(!item || !item.Get('popup'))
	{
		return false;
	}

	const previous = $ot.modules.settings.get('ui.navbar.open', null);

	if(previous === id)
	{
		return false;
	}

	if(previous)
	{
		this.ItemGet(previous)?.Fn('close');
	}

	if(!item.Fn('open'))
	{
		return false;
	}

	$ot.modules.settings.set('ui.navbar.open', id);

	onetype.Emit('ui.navbar.open', { id });

	return true;
});
