import commands from '@onetype/framework/commands';
import locations from '#tc-locations/addon.js';

commands.Item({
    id: 'tc.cities:delete',
    exposed: true,
    method: 'DELETE',
    endpoint: '/api/tc/cities/:id',
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

        const item = await locations.cities.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        await item.Delete();

        resolve({});
    }
});
