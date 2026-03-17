sites.sections.Fn('create', async function(page_id, order)
{
	const site = $ot.get('site');

	if(!site || !page_id)
	{
		return null;
	}

	if(order === undefined)
	{
		order = Object.values(sites.sections.Items())
			.filter(item => item.Get('page_id') === page_id).length;
	}

	const result = await $ot.command('sections:create', { site_id: site.id, page_id, order }, true);
	const section = result.data.section;
	const item = this.Item(section);

	onetype.Emit('sites.sections.create', item);

	return item;
});
