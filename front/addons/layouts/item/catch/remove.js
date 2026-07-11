ui.layouts.ItemOn('remove', (item) =>
{
	if(item.Get('render'))
	{
		ui.layouts.RenderRemove(item.Get('id'));
	}
});
