ui.canvas.ItemOn('removed', (item) =>
{
	if(item.Get('render'))
	{
		ui.canvas.RenderRemove(item.Get('id'));
	}
});
