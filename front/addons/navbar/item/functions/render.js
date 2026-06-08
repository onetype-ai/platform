navbar.Fn('item.render', function(item)
{
	return navbar.Render(item.Get('id'), { ...item.Get('data') }).Element;
});
