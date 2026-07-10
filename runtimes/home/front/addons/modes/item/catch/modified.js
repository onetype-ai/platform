ui.modes.ItemOn('modified', (item) =>
{
	ui.explorer.Item({
		id: 'mode-' + item.Get('id'),
		order: 20,
		group: 'Modes',
		prefix: 'modes',
		icon: item.Get('icon') || 'tune',
		label: item.Get('name') || item.Get('id'),
		hint: 'Switch mode',
		keywords: [item.Get('id')],
		condition: { app: item.Get('condition').app },
		callback: () => $ot.ui.modes.switch(item.Get('id'))
	});
});
