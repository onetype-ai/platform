sites.pages.Fn('deactivate', function()
{
	const items = sites.pages.Items();

	for(const key in items)
	{
		if(items[key].Get('active'))
		{
			items[key].Set('active', false);
		}
	}

	onetype.Emit('sites.pages.deactivate');
	$ot.set('site.page', null);
});
