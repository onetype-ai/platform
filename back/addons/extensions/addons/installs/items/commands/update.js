import commands from '@onetype/framework/commands';
import extensions from '#extensions/addon.js';

commands.Item({
    id: 'installs:update',
    exposed: true,
    method: 'PUT',
    endpoint: '/api/installs/:id',
    in: {
        id: ['string', null, true],
        config: ['object']
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

        const item = await extensions.installs.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        if(properties.config !== undefined)
        {
            item.Set('config', properties.config);
        }

        await item.Update();

        resolve({
            install: item.Get(['id', 'team_id', 'site_id', 'extension_id', 'config', 'updated_at', 'created_at'])
        });
    }
});
