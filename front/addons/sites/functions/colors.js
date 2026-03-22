sites.Fn('colors', async function(fields)
{
	const site = $ot.get('site');
	const colors = { ...site.colors, ...fields };

	await $ot.command('sites:update', { id: site.id, colors }, true);

	$ot.set('site', { ...site, colors });

	const item = sites.Item(site.id);

	if(item)
	{
		item.Set('colors', colors);
	}
});
