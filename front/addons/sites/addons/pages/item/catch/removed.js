sites.pages.ItemOn('removed', (item) =>
{
	editor.canvas.ItemRemove(item.Get('id'));
});