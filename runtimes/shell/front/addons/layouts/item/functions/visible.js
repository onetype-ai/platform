ui.layouts.Fn('item.visible', function(item)
{
	if(!item.Get('isActive'))
	{
		return false;
	}

	const screen = $ot.ui.screens.active()?.Get('id');
	const screens = item.Get('screen');

	if(Array.isArray(screens) && screens.length && !screens.includes(screen))
	{
		return false;
	}

	const condition = item.Get('condition');

	if(condition.app.length && !condition.app.includes($ot.ui.apps.active()?.Get('id')))
	{
		return false;
	}

	if(condition.mode.length && !condition.mode.includes($ot.ui.modes.active()?.Get('id')))
	{
		return false;
	}

	if(condition.user && !$ot.get('user'))
	{
		return false;
	}

	if(condition.project && !$ot.projects.active())
	{
		return false;
	}

	/* @todo permission check — wire once permissions has/grant API exists */

	if(condition.callback && condition.callback.call(ui.layouts.Fn('data'), item) === false)
	{
		return false;
	}

	return true;
});
