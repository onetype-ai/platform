sites.pages.Fn('activate', function(id)
{
	const item = sites.pages.ItemGet(id);

	if(!item)
	{
		return null;
	}

	sites.pages.Fn('deactivate');

	item.Set('active', true);
	onetype.Emit('sites.pages.activate', {page: item});

	return item;
});
