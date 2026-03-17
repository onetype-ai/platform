sites.sections.Fn('activate', function(id)
{
	const item = sites.sections.ItemGet(id);

	if(!item)
	{
		return null;
	}

	sites.sections.Fn('deactivate');

	item.Set('active', true);
	onetype.Emit('sites.sections.activate', { section: item });

	$ot.set('site.section', item.data);

	return item;
});
