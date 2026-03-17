sites.variables.Fn('delete', async function(id)
{
	const item = sites.variables.ItemGet(id);

	if(!item)
	{
		return null;
	}

	if(item.Get('active'))
	{
		sites.variables.Fn('deactivate');
	}

	sites.variables.ItemRemove(id);

	onetype.Emit('sites.variables.delete', { id });

	await $ot.command('variables:delete', { id }, true);

	return true;
});
