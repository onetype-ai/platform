onetype.AddonReady('ui.explorer', (explorer) =>
{
	ui.canvas.ItemOn('add', (item) =>
	{
		if(item.Get('group') !== 'pages')
		{
			return;
		}

		explorer.Item({
			id: 'page-' + item.Get('id'),
			order: 30,
			group: 'Pages',
			prefix: 'pages',
			icon: item.Get('icon') || 'web_asset',
			label: item.Get('name') || item.Get('id'),
			hint: 'Jump to page',
			keywords: [item.Get('id')],
			callback: () => $ot.command('ui:canvas:jump', { id: item.Get('id') })
		});
	});

	ui.canvas.ItemOn('modified', (item) =>
	{
		const entry = explorer.ItemGet('page-' + item.Get('id'));

		if(entry)
		{
			entry.Set('label', item.Get('name') || item.Get('id'));
		}
	});

	ui.canvas.ItemOn('remove', (item) =>
	{
		explorer.ItemRemove('page-' + item.Get('id'));
	});
});
