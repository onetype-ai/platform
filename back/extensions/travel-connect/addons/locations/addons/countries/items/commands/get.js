import commands from '@onetype/framework/commands';
import locations from '#tc-locations/addon.js';

const FIELDS = ['id', 'team_id', 'name', 'basic_description', 'medium_description', 'advanced_description', 'video_url', 'website_url', 'images', 'gallery', 'updated_at', 'created_at'];

commands.Item({
    id: 'tc.countries:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/tc/countries/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        country: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = await locations.countries.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ country: item.Get(FIELDS) });
    }
});
