sites.pages.Fn('delete', async function(id)
{
	const item = sites.pages.ItemGet(id);

	if(!item)
	{
		return null;
	}

	if(item.Get('active'))
	{
		sites.pages.Fn('deactivate');
	}

	sites.pages.ItemRemove(id);

	onetype.Emit('sites.pages.delete', { id });

	await $ot.command('pages:delete', { id }, true);

	return true;
});
