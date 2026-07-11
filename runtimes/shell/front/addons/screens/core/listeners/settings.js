onetype.EmitOn('modules.settings.ready', () =>
{
	const item = Object.values(ui.screens.Items()).find((screen) => screen.Get('route') === window.location.pathname);

	if(item)
	{
		$ot.command('ui:screens:open', { id: item.Get('id') });
	}
	else if($ot.modules.settings.get('ui.screens.active', null))
	{
		$ot.modules.settings.set('ui.screens.active', null);
	}
});
