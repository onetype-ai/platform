ui.navbar.ItemOn('remove', (item) =>
{
	if(item.Get('render'))
	{
		ui.navbar.RenderRemove(item.Get('id'));
	}
});
