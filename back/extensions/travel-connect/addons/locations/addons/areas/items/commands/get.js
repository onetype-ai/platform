import commands from '@onetype/framework/commands';
import locations from '#tc-locations/addon.js';

const FIELDS = ['id', 'team_id', 'name', 'type', 'group', 'basic_description', 'medium_description', 'advanced_description', 'video_url', 'website_url', 'country_id', 'images', 'gallery', 'updated_at', 'created_at'];

commands.Item({
    id: 'tc.areas:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/tc/areas/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        area: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = await locations.areas.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ area: item.Get(FIELDS) });
    }
});
