extensions.installs.Fn('install', async function(site, extension)
{
	if(!site || !extension)
	{
		return null;
	}

	const result = await $ot.command('installs:create', {
		site_id: site.id,
		extension_id: extension.id,
		config: {}
	}, true);

	if(result.error)
	{
		return null;
	}

	const item = this.Item(result.data.install);

	onetype.Emit('extensions.installs.install', item);

	return item;
});
