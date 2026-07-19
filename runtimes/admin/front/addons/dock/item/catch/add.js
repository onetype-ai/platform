ui.dock.ItemOn('add', (item) =>
{
	const render = item.Get('render');

	if(render)
	{
		ui.dock.RenderAdd(item.Get('id'), function()
		{
			if(typeof render === 'function')
			{
				return render.call(this);
			}

			return render;
		});
	}
});
