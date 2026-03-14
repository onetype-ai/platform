sites.sections.Fn('delete', async function(id)
{
	const item = sites.sections.ItemGet(id);

	if(!item)
	{
		return null;
	}

	await $ot.command('sections:delete', { id }, true);

	sites.sections.ItemRemove(id);

	onetype.Emit('sites.sections.delete', { id });

	return true;
});
