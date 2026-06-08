navbar.ItemOn('add', (item) =>
{
	const render = item.Get('render');

	if(render)
	{
		navbar.RenderAdd(item.Get('id'), function()
		{
			this.Define(item.Get('config'));

			if(typeof render === 'function')
			{
				return render.call(this);
			}

			return render;
		});
	}
});
