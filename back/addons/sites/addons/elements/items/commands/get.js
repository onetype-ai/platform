import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'elements:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/elements/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        element: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = await sites.elements.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ element: item.Get(['id', 'team_id', 'site_id', 'name', 'slug', 'data', 'updated_at', 'created_at']) });
    }
});
