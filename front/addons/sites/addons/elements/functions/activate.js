sites.elements.Fn('activate', function(id)
{
	const item = sites.elements.ItemGet(id);

	if(!item)
	{
		return null;
	}

	sites.elements.Fn('deactivate');

	item.Set('active', true);
	onetype.Emit('sites.elements.activate', { element: item });

	$ot.set('site.element', item.data);

	return item;
});
