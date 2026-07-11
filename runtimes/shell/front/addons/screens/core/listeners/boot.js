$ot.boot.then(() =>
{
	const item = Object.values(ui.screens.Items()).find((screen) => screen.Get('route') === window.location.pathname);

	if(item)
	{
		$ot.command('ui:screens:open', { id: item.Get('id') });
	}
});
