sites.sections.Fn('delete', async function(id)
{
	const item = sites.sections.ItemGet(id);

	if(!item)
	{
		return null;
	}

	sites.sections.ItemRemove(id);

	onetype.Emit('sites.sections.delete', { id });

	await $ot.command('sections:delete', { id }, true);

	return true;
});
