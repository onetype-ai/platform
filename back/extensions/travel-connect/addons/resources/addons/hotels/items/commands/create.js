import commands from '@onetype/framework/commands';
import resources from '#tc-resources/addon.js';

commands.Item({
    id: 'tc.hotels:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/tc/hotels',
    in: {
        name: ['string', null, true],
        stars: ['number'],
        description: ['string', null, true],
        link: ['string'],
        images: ['array'],
        city_id: ['string']
    },
    out: {
        hotel: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = resources.hotels.Item({
            team_id: user.team.id,
            name: properties.name,
            stars: properties.stars,
            description: properties.description,
            link: properties.link,
            images: properties.images,
            city_id: properties.city_id
        });

        await item.Create();

        resolve({
            hotel: item.Get(['id', 'team_id', 'name', 'stars', 'description', 'link', 'images', 'city_id', 'updated_at', 'created_at'])
        });
    }
});
