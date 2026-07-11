ui.status.Fn('item.render', function(item)
{
	return ui.status.Render(item.Get('id'), { ...item.Get('data') }).Element;
});
