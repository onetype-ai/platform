import platform from '#platform/addon.js';

onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'packages:disable',
        addon: 'platform.packages',
        description: 'Disable a package on the instance. The package stops loading on the next boot.',
        exposed: true,
        method: 'POST',
        endpoint: '/api/packages/:slug/disable',
        in: {
            slug: {
                type: 'string',
                required: true,
                description: 'Slug of the package to disable.'
            }
        },
        out: 'platform.packages.package',
        callback: async function(properties, resolve)
        {
            const item = platform.packages.one(properties.slug);

            if(!item)
            {
                return resolve(null, 'Package ' + properties.slug + ' not found.', 404);
            }

            if(item.Get('status') === 'disabled')
            {
                return resolve(null, 'Package ' + properties.slug + ' is already disabled.', 400);
            }

            const dependants = item.Fn('is.dependant');

            if(dependants.length)
            {
                return resolve(null, 'Package ' + item.Get('slug') + ' is required by ' + dependants.join(', ') + ' and cannot be disabled.', 400);
            }

            platform.packages.disable(item.Get('slug'));

            resolve(item.GetData(), 'Package ' + item.Get('slug') + ' is now disabled.');
        }
    });
});
