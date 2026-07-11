ui.apps.ItemOn('add', (item) =>
{
	onetype.AddonReady('ui.dock', (dock) =>
	{
		if(!item.Get('isVisible'))
		{
			return;
		}

		dock.Item({
			id: item.Get('id'),
			name: item.Get('name'),
			icon: item.Get('icon'),
			color: item.Get('color'),
			order: item.Get('order'),
			position: item.Get('position'),
			condition: item.Get('condition'),
			isActive: () => item.Get('isActive'),
			render: item.Get('render'),
			badge: item.Get('badge'),
			onClick: () => item.Get('isActive') ? $ot.ui.apps.close() : $ot.ui.apps.open(item.Get('id'))
		});
	});

	onetype.AddonReady('ui.explorer', (explorer) =>
	{
		explorer.Item({
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
	});
});
