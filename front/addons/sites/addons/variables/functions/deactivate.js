sites.variables.Fn('deactivate', function()
{
	const items = sites.variables.Items();

	for(const key in items)
	{
		if(items[key].Get('active'))
		{
			items[key].Set('active', false);
		}
	}

	onetype.Emit('sites.variables.deactivate');
	$ot.set('site.variable', null);
});
