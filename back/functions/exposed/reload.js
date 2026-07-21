import platform from '#platform/addon.js';

platform.FnExpose('reload', async function()
{
	const context = await onetype.Middleware('platform.reload', { cancel: false });

	if(context.value.cancel)
	{
		return false;
	}

	onetype.Emit('platform.reload');

	setTimeout(() => process.exit(75), 100);

	return true;
});
