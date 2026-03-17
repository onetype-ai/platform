import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'variables:delete',
    exposed: true,
    method: 'DELETE',
    endpoint: '/api/variables/:id',
    in: {
        id: ['string', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const variable = await sites.variables.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!variable)
        {
            return resolve(null, 'Not found.', 404);
        }

        await variable.Delete();

        resolve({});
    }
});
