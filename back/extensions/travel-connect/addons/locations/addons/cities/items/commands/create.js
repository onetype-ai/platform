import commands from '@onetype/framework/commands';
import locations from '#tc-locations/addon.js';

const FIELDS = ['id', 'team_id', 'name', 'basic_description', 'medium_description', 'advanced_description', 'video_url', 'website_url', 'country_id', 'area_id', 'images', 'gallery', 'updated_at', 'created_at'];

commands.Item({
    id: 'tc.cities:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/tc/cities',
    in: {
        name: ['string', null, true],
        basic_description: ['string'],
        medium_description: ['string'],
        advanced_description: ['string'],
        video_url: ['string'],
        website_url: ['string'],
        country_id: ['string'],
        area_id: ['string'],
        images: ['array'],
        gallery: ['array']
    },
    out: {
        city: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = locations.cities.Item({
            team_id: user.team.id,
            ...properties
        });

        await item.Create();

        resolve({ city: item.Get(FIELDS) });
    }
});
