onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'packages:disable',
        addon: 'packages',
        description: 'Disable a package on the instance. The package stops loading on the next boot.',
        exposed: false,
        in: {
            slug: {
                type: 'string',
                required: true,
                description: 'Slug of the package to disable.'
            }
        },
        out: 'platform.package',
        callback: async function(properties, resolve)
        {
            const { data, message, code } = await packages.disable(properties.slug);

            if(code !== 200)
            {
                $ot.float.toast({ message, type: 'error' });

                return resolve(null, message, code);
            }

            $ot.float.toast({ message, type: 'success' });

            resolve(data);
        }
    });
});
