import platform from '#platform/addon.js';

onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'platform:reload',
        addon: 'platform',
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
});
