import commands from '@onetype/framework/commands';
import extensions from '#extensions/addon.js';

commands.Item({
    id: 'installs:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/installs',
    in: {
        site_id: ['string', null, true],
        extension_id: ['string', null, true],
        config: ['object', {}, true]
    },
    out: {
        install: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const existing = await extensions.installs.Find()
            .filter('site_id', properties.site_id)
            .filter('extension_id', properties.extension_id)
            .filter('team_id', user.team.id)
            .filter('deleted_at', null, 'NULL')
            .one();

        if(existing)
        {
            return resolve(null, 'Extension already installed.', 409);
        }

        const item = extensions.installs.Item({
            team_id: user.team.id,
            site_id: properties.site_id,
            extension_id: properties.extension_id,
            config: properties.config
        });

        await item.Create();

        resolve({
            install: item.Get(['id', 'team_id', 'site_id', 'extension_id', 'config', 'updated_at', 'created_at'])
        });
    }
});
