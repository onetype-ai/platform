ui.modes.Fn('item.visible', function(item)
{
	const condition = item.Get('condition');

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

	if(condition.user && !$ot.get('user'))
	{
		return false;
	}

	if(condition.project && !$ot.projects.active())
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
