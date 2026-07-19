ui.navbar.Fn('close', function()
{
	const open = $ot.modules.settings.get('ui.navbar.open', null);

	if(!open)
	{
		return false;
	}

	this.ItemGet(open)?.Fn('close');

	return true;
});
