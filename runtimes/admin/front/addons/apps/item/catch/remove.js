ui.apps.ItemOn('remove', (item) =>
{
	ui.dock.ItemRemove(item.Get('id'));

	ui.explorer.ItemRemove('app-' + item.Get('id'));
});
