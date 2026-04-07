extensions.installs.Fn('uninstall', async function(id)
{
	if(!id)
	{
		return null;
	}

	await $ot.command('installs:delete', { id }, true);

	onetype.Emit('extensions.installs.uninstall', { id });

	return true;
});
