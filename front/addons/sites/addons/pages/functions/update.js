sites.pages.Fn('update', async function(id, fields = {})
{
	const item = sites.pages.ItemGet(id);

	if(!item)
	{
		return null;
	}

	const result = await $ot.command('pages:update', { id, ...fields }, true);
	const page = result.data.page;

	for(const flag of ['is_home', 'is_404'])
	{
		if(fields[flag] === true)
		{
			for(const other of Object.values(sites.pages.Items()))
			{
				if(other.Get('id') !== id && other.Get(flag))
				{
					other.Set(flag, false);
				}
			}
		}
	}

	for(const [key, value] of Object.entries(page))
	{
		item.Set(key, value);
	}

	onetype.Emit('sites.pages.update', item);

	return item;
});
