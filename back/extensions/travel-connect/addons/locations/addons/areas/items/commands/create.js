import commands from '@onetype/framework/commands';
import locations from '#tc-locations/addon.js';

const FIELDS = ['id', 'team_id', 'name', 'type', 'group', 'basic_description', 'medium_description', 'advanced_description', 'video_url', 'website_url', 'country_id', 'images', 'gallery', 'updated_at', 'created_at'];

commands.Item({
    id: 'tc.areas:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/tc/areas',
    in: {
        name: ['string', null, true],
        type: ['string'],
        group: ['string'],
        basic_description: ['string'],
        medium_description: ['string'],
        advanced_description: ['string'],
        video_url: ['string'],
        website_url: ['string'],
        country_id: ['string'],
        images: ['array'],
        gallery: ['array']
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

        const item = locations.areas.Item({
            team_id: user.team.id,
            ...properties
        });

        await item.Create();

        resolve({ area: item.Get(FIELDS) });
    }
});
