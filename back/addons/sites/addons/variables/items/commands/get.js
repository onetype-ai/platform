import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'variables:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/variables/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        variable: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = await sites.variables.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({
            variable: item.Get(['id', 'team_id', 'site_id', 'name', 'group', 'type', 'value', 'values', 'config', 'updated_at', 'created_at'])
        });
    }
});
