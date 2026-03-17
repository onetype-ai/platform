sites.sections.Fn('deactivate', function()
{
	const items = sites.sections.Items();

	for(const key in items)
	{
		if(items[key].Get('active'))
		{
			items[key].Set('active', false);
		}
	}

	onetype.Emit('sites.sections.deactivate');
	$ot.set('site.section', null);
});
