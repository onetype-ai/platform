import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'elements:delete',
    exposed: true,
    method: 'DELETE',
    endpoint: '/api/elements/:id',
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

        const element = await sites.elements.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!element)
        {
            return resolve(null, 'Not found.', 404);
        }

        await element.Delete();

        resolve({});
    }
});
