onetype.EmitOn('ui.layouts.data', () =>
{
	const active = $ot.ui.screens.active();

	if(!active)
	{
		return;
	}

	const siblings = Object.values(ui.screens.Items()).filter((item) => item.Get('app') === active.Get('app') && item.Get('mode') === active.Get('mode'));

	const count = (item) =>
	{
		return Object.keys(item.Get('params')).filter((parameter) => ui.layouts.Fn('data')[item.Get('params')[parameter]]).length;
	};

	const next = siblings.filter((item) => ui.screens.Fn('url', item)).sort((left, right) => count(right) - count(left))[0] || active;

	if(next.Get('id') !== active.Get('id'))
	{
		ui.screens.Fn('open', next.Get('id'));

		return;
	}

	const url = ui.screens.Fn('url', active);

	if(url && window.location.pathname !== url)
	{
		history.replaceState(null, '', url);
	}
});
