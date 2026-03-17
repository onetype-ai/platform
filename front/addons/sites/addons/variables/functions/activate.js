sites.variables.Fn('activate', function(id)
{
	const item = sites.variables.ItemGet(id);

	if(!item)
	{
		return null;
	}

	sites.variables.Fn('deactivate');

	item.Set('active', true);
	onetype.Emit('sites.variables.activate', { variable: item });

	$ot.set('site.variable', item.data);

	return item;
});
