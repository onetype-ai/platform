import commands from '@onetype/framework/commands';
import resources from '#tc-resources/addon.js';

commands.Item({
    id: 'tc.cruisers:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/tc/cruisers/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        cruiser: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = await resources.cruisers.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ cruiser: item.Get(['id', 'team_id', 'name', 'company', 'description', 'video', 'images', 'updated_at', 'created_at']) });
    }
});
