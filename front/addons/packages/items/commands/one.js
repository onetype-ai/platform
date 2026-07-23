onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'packages:one',
        addon: 'platform.packages',
        description: 'Read one package by its slug.',
        exposed: false,
        in: {
            slug: {
                type: 'string',
                required: true,
                description: 'Slug of the package to read.'
            }
        },
        out: 'platform.packages.package',
        callback: async function(properties, resolve)
        {
            const { data, message, code } = await platform.packages.one(properties.slug, true);

            if(code !== 200)
            {
                $ot.float.toast({ message, type: 'error' });

                return resolve(null, message, code);
            }

            resolve(data);
        }
    });
});
