sites.pages.Fn('create', async function(title = 'Untitled', route = '/')
{
	const site = $ot.get('site');

	if(!site)
	{
		return null;
	}

	const result = await $ot.command('pages:create', { site_id: site.id, title, route }, true);
	const page = result.data.page;
	const item = this.Item(page);

	onetype.Emit('sites.pages.create', item);

	return item;
});
