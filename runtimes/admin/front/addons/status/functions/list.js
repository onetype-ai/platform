ui.status.Fn('list', function()
{
	const panel = ui.layouts.ItemGet('status-panel');
	const active = panel && panel.Get('active') ? panel.Get('data').tab : null;

	return Object.values(this.Items()).sort((a, b) => a.Get('order') - b.Get('order')).filter((item) =>
	{
		return item.Fn('visible');
	}).map((item) =>
	{
		return {
			id: item.Get('id'),
			icon: item.Get('icon'),
			label: item.Get('label'),
			align: item.Get('align'),
			tab: !!item.Get('render'),
			open: item.Get('id') === active
		};
	});
});
