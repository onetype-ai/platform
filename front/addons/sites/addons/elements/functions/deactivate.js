sites.elements.Fn('deactivate', function()
{
	const items = sites.elements.Items();

	for(const key in items)
	{
		if(items[key].Get('active'))
		{
			items[key].Set('active', false);
		}
	}

	onetype.Emit('sites.elements.deactivate');
	$ot.set('site.element', null);
});
