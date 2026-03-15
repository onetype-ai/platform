sites.elements.Fn('delete', async function(id)
{
	const item = sites.elements.ItemGet(id);

	if(!item)
	{
		return null;
	}

	await $ot.command('elements:delete', { id }, true);

	sites.elements.ItemRemove(id);

	onetype.Emit('sites.elements.delete', { id });

	return true;
});
