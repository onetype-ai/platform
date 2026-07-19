ui.apps.ItemOn('modified', (item) =>
{
	if(!item.Get('isVisible') || item.Get('isHidden'))
	{
		ui.dock.ItemRemove(item.Get('id'));
	}
	else
	{
		ui.dock.Item({
			id: item.Get('id'),
			name: item.Get('name'),
			icon: item.Get('icon'),
			color: item.Get('color'),
			order: item.Get('order'),
			condition: item.Get('condition'),
			isActive: () => item.Get('isActive'),
			render: item.Get('render'),
			badge: item.Get('badge'),
			onClick: () => item.Get('isActive') ? $ot.ui.apps.close() : $ot.ui.apps.open(item.Get('id'))
		});
	}

	if(item.Get('isHidden'))
	{
		ui.explorer.ItemRemove('app-' + item.Get('id'));
	}
	else
	{
		ui.explorer.Item({
			id: 'app-' + item.Get('id'),
			order: 10,
			group: 'Applications',
			prefix: 'apps',
			icon: item.Get('icon'),
			label: item.Get('name'),
			hint: 'Open application',
			keywords: [item.Get('id')],
			callback: () => $ot.ui.apps.open(item.Get('id'))
		});
	}
});
