ui.apps.Fn('item.visible', function(item)
{
	if(item.Get('isHidden'))
	{
		return false;
	}

	const condition = item.Get('condition');

	const mode = $ot.ui.modes.active()?.Get('id');

	if(condition.mode === true && !mode)
	{
		return false;
	}

	if(condition.mode === false && mode)
	{
		return false;
	}

	if(Array.isArray(condition.mode) && condition.mode.length && !condition.mode.includes(mode))
	{
		return false;
	}

	if(condition.user && !$ot.get('user'))
	{
		return false;
	}

	/* @todo permission check — wire once permissions has/grant API exists */

	if(condition.callback && condition.callback.call({}, item) === false)
	{
		return false;
	}

	return true;
});
