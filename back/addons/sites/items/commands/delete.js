import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sites:delete',
    exposed: true,
    method: 'DELETE',
    endpoint: '/api/sites/:id',
    in: {
        id: ['string', null, true]
    },
    out: {},
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const site = await sites.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!site)
        {
            return resolve(null, 'Not found.', 404);
        }

        site.Set('deleted_at', new Date().toISOString());
        await site.Update();

        resolve({});
    }
});
