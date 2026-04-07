import commands from '@onetype/framework/commands';
import locations from '#tc-locations/addon.js';

const FIELDS = ['id', 'team_id', 'name', 'basic_description', 'medium_description', 'advanced_description', 'video_url', 'website_url', 'images', 'gallery', 'updated_at', 'created_at'];

commands.Item({
    id: 'tc.countries:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/tc/countries',
    in: {
        name: ['string', null, true],
        basic_description: ['string'],
        medium_description: ['string'],
        advanced_description: ['string'],
        video_url: ['string'],
        website_url: ['string'],
        images: ['array'],
        gallery: ['array']
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

        const item = locations.countries.Item({
            team_id: user.team.id,
            ...properties
        });

        await item.Create();

        resolve({ country: item.Get(FIELDS) });
    }
});
