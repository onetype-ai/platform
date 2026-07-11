ui.dock.Fn('item.visible', function(item)
{
	const condition = item.Get('condition');

	const screen = $ot.ui.screens.active()?.Get('id');

	if(screen ? !condition.screen.includes(screen) : condition.screen.length)
	{
		return false;
	}

	const app = $ot.ui.apps.active()?.Get('id');

	if(condition.app === true && !app)
	{
		return false;
	}

	if(condition.app === false && app)
	{
		return false;
	}

	if(Array.isArray(condition.app) && condition.app.length && !condition.app.includes(app))
	{
		return false;
	}

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

	if(condition.project && !$ot.projects?.active())
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
