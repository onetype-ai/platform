ui.apps.Fn('list', function()
{
	return Object.values(this.Items()).filter((item) => item.Fn('visible')).sort((a, b) => a.Get('order') - b.Get('order')).map((item) =>
	{
		return {
			id: item.Get('id'),
			icon: item.Get('icon'),
			label: item.Get('name'),
			color: item.Get('color'),
			render: item.Get('render'),
			badge: item.Get('badge'),
			isActive: item.Get('isActive')
		};
	});
});
