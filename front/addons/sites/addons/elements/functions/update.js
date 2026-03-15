sites.elements.Fn('update', async function(id, fields = {})
{
	const item = sites.elements.ItemGet(id);

	if(!item)
	{
		return null;
	}

	const result = await $ot.command('elements:update', { id, ...fields }, true);
	const element = result.data.element;

	for(const [key, value] of Object.entries(element))
	{
		item.Set(key, value);
	}

	onetype.Emit('sites.elements.update', item);

	return item;
});
