ui.status.ItemOn('removed', (item) =>
{
	if(item.Get('render'))
	{
		ui.status.RenderRemove(item.Get('id'));
	}
});
