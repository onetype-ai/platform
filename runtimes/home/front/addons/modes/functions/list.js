ui.modes.Fn('list', function()
{
	return Object.values(this.Items()).sort((a, b) => a.Get('order') - b.Get('order')).filter((item) =>
	{
		return item.Fn('visible');
	}).map((item) =>
	{
		return {
			id: item.Get('id'),
			icon: item.Get('icon'),
			label: item.Get('name'),
			isActive: item.Get('isActive')
		};
	});
});
