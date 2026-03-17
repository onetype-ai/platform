sites.elements.Fn('delete', async function(id)
{
	const item = sites.elements.ItemGet(id);

	if(!item)
	{
		return null;
	}

	if(item.Get('active'))
	{
		sites.elements.Fn('deactivate');
	}

	sites.elements.ItemRemove(id);

	onetype.Emit('sites.elements.delete', { id });

	await $ot.command('elements:delete', { id }, true);

	return true;
});
