onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'platform:health',
        addon: 'platform',
        description: 'Reports the instance health, uptime and status.',
        exposed: true,
        method: 'GET',
        endpoint: '/health',
        out: {
            uptime: ['number', null, true]
        },
        callback: async function(properties, resolve)
        {
            resolve({
                uptime: process.uptime()
            });
        }
    });
});
