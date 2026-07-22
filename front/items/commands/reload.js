onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'platform:reload',
        addon: 'platform',
        description: 'Restart the platform process. The supervisor respawns it with a fresh module cache, so enabled and disabled packages take effect.',
        exposed: false,
        callback: async function(properties, resolve)
        {
            const { data, message, code } = await platform.reload();

            if(code !== 200)
            {
                $ot.float.toast({ message, type: 'error' });

                return resolve(null, message, code);
            }

            $ot.float.toast({ message, type: 'info' });

            resolve(data, message);
        }
    });
});
