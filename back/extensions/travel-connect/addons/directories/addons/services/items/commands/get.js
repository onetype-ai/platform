import commands from '@onetype/framework/commands';
import directories from '#tc-directories/addon.js';

const FIELDS = ['id', 'team_id', 'name', 'description', 'order', 'popular', 'icon_id', 'icon', 'updated_at', 'created_at'];

commands.Item({
    id: 'tc.services:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/tc/services/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        service: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = await directories.services.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ service: item.Get(FIELDS) });
    }
});
