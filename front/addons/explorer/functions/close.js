ui.explorer.Fn('close', function()
{
	if($ot.ui.navbar.opened()?.Get('id') !== 'explorer')
	{
		return false;
	}

	$ot.ui.navbar.close();

	return true;
});
