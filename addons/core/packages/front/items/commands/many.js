onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'packages:many',
        addon: 'packages',
        description: 'List every package of the instance with its manifest and status.',
        exposed: false,
        out: {
            items: {
                type: 'array',
                each: 'platform.package',
                description: 'Every package of the instance.'
            }
        },
        callback: async function(properties, resolve)
        {
            const { data, message, code } = await packages.many(true);

            if(code !== 200)
            {
                $ot.float.toast({ message, type: 'error' });

                return resolve(null, message, code);
            }

            resolve(data);
        }
    });
});
