sites.sections.Fn('create', async function(page_id, order)
{
	const site = $ot.get('site');

	if(!site || !page_id)
	{
		return null;
	}

	const siblings = Object.values(sites.sections.Items())
		.filter(item => item.Get('page_id') === page_id)
		.sort((a, b) => a.Get('order') - b.Get('order'));

	if(order === undefined)
	{
		order = siblings.length * 10;
	}

	const result = await $ot.command('sections:create', { site_id: site.id, page_id, order }, true);
	const section = result.data.section;
	const item = this.Item(section);

	const all = Object.values(sites.sections.Items())
		.filter(item => item.Get('page_id') === page_id)
		.sort((a, b) => a.Get('order') - b.Get('order'));

	for(let i = 0; i < all.length; i++)
	{
		const target = i * 10;

		if(all[i].Get('order') !== target)
		{
			all[i].Set('order', target);
			$ot.command('sections:update', { id: all[i].Get('id'), order: target }, true);
		}
	}

	onetype.Emit('sites.sections.create', item);

	return item;
});
