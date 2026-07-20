import platform from '#platform/addon.js';

platform.CommandAdd({
	id: 'reload',
	description: 'Restart the platform process. The supervisor respawns it with a fresh module cache, so enabled and disabled packages take effect.',
	exposed: true,
	method: 'POST',
	endpoint: '/api/platform/reload',
	callback: async function(properties, resolve)
	{
		const started = await platform.reload();

		if(!started)
		{
			return resolve(null, 'Reload was cancelled.', 409);
		}

		resolve(null, 'Platform is reloading.');
	}
});
