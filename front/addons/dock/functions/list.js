ui.dock.Fn('list', function()
{
	return Object.values(this.Items()).filter((item) => item.Fn('visible')).sort((a, b) => a.Get('order') - b.Get('order')).map((item) =>
	{
		const active = item.Get('isActive');

		return {
			id: item.Get('id'),
			icon: item.Get('icon'),
			label: item.Get('name'),
			color: item.Get('color'),
			position: item.Get('position'),
			isActive: typeof active === 'function' ? active(item) === true : active,
			isOpen: item.Get('isOpen'),
			onClick: item.Get('onClick'),
			render: item.Get('render'),
			panel: item.Get('panel'),
			badge: item.Get('badge')
		};
	});
});
