ui.layouts.Fn('item.render', function(item)
{
	return ui.layouts.Render(item.Get('id'), { ...ui.layouts.Fn('data'), ...(ui.layouts.StoreGet('values.' + item.Get('id')) || {}) }).Element;
});
