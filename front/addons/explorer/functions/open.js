ui.explorer.Fn('open', function()
{
	if($ot.ui.navbar.opened()?.Get('id') === 'explorer')
	{
		return false;
	}

	$ot.ui.navbar.open('explorer');

	onetype.Emit('ui.explorer.open', {});

	return true;
});
