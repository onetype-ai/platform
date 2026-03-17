sites.sections.Fn('update', async function(id, fields = {})
{
	const item = sites.sections.ItemGet(id);

	if(!item)
	{
		return null;
	}

	for(const [key, value] of Object.entries(fields))
	{
		item.Set(key, value);
	}

	const result = await $ot.command('sections:update', { id, ...fields }, true);
	const section = result.data.section;

	for(const [key, value] of Object.entries(section))
	{
		item.Set(key, value);
	}

	onetype.Emit('sites.sections.update', item);

	return item;
});
