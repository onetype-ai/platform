onetype.EmitOn('ui.layouts.data', () =>
{
	const active = $ot.ui.screens.active();

	if(!active)
	{
		return;
	}

	const url = ui.screens.Fn('url', active);

	if(url && window.location.pathname !== url)
	{
		history.replaceState(null, '', url);
	}
});
