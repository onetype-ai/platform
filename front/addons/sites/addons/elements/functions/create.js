sites.elements.Fn('create', async function(name, slug)
{
	const site = $ot.get('site');

	if(!site || !name || !slug)
	{
		return null;
	}

	const result = await $ot.command('elements:create', { site_id: site.id, name, slug }, true);
	const element = result.data.element;
	const item = this.Item(element);

	onetype.Emit('sites.elements.create', item);

	return item;
});
