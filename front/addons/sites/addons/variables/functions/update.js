sites.variables.Fn('update', async function(id, fields)
{
	const item = sites.variables.ItemGet(id);

	if(!item)
	{
		return null;
	}

	for(const [key, value] of Object.entries(fields))
	{
		item.Set(key, value);
	}

	const result = await $ot.command('variables:update', { id, ...fields }, true);
	const variable = result.data.variable;

	for(const [key, value] of Object.entries(variable))
	{
		item.Set(key, value);
	}

	onetype.Emit('sites.variables.update', item);

	return item;
});
