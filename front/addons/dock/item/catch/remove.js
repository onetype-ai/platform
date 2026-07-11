ui.dock.ItemOn('remove', (item) =>
{
	if(item.Get('render'))
	{
		ui.dock.RenderRemove(item.Get('id'));
	}
});
