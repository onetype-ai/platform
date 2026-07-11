ui.screens.ItemOn('added', (item) =>
{
	if(!item.Get('route'))
	{
		return;
	}

	onetype.AddonReady('pages', (pages) =>
	{
		const page = pages.ItemGet('home');
		const routes = [].concat(page.Get('route'));

		if(!routes.includes(item.Get('route')))
		{
			page.Set('route', routes.concat(item.Get('route')), false);
		}
	});
});
