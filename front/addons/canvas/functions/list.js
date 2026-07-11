ui.canvas.Fn('list', function()
{
	return Object.values(this.Items()).sort((a, b) => a.Get('order') - b.Get('order')).filter((item) =>
	{
		return item.Fn('visible');
	}).map((item) =>
	{
		return {
			id: item.Get('id'),
			order: item.Get('order'),
			name: item.Get('name'),
			icon: item.Get('icon'),
			group: item.Get('group'),
			x: item.Get('x'),
			y: item.Get('y'),
			width: item.Get('width'),
			height: item.Get('height'),
			links: item.Get('links'),
			data: item.Get('data')
		};
	});
});
