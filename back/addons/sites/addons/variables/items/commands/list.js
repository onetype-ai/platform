import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'variables:list',
    exposed: true,
    method: 'GET',
    endpoint: '/api/variables',
    in: {
        site_id: ['string', null, true]
    },
    out: {
        variables: ['array', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const items = await sites.variables.Find()
            .filter('team_id', user.team.id)
            .filter('site_id', properties.site_id)
            .sort('name', 'asc')
            .many();

        resolve({
            variables: items.map(item => item.Get(['id', 'team_id', 'site_id', 'name', 'group', 'type', 'value', 'values', 'config', 'updated_at', 'created_at']))
        });
    }
});
