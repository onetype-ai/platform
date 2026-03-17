sites.variables.Fn('create', async function(data)
{
	const site = $ot.get('site');

	if(!site)
	{
		return null;
	}

	const result = await $ot.command('variables:create', { site_id: site.id, ...data }, true);
	const variable = result.data.variable;
	const item = this.Item(variable);

	onetype.Emit('sites.variables.create', item);

	return item;
});
