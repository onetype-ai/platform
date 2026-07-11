ui.canvas.Fn('item.render', function(item)
{
	return ui.canvas.Render(item.Get('id'), { ...item.Get('data') }).Element;
});
