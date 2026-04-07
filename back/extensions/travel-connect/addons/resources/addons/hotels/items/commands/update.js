import commands from '@onetype/framework/commands';
import resources from '#tc-resources/addon.js';

commands.Item({
    id: 'tc.hotels:update',
    exposed: true,
    method: 'PUT',
    endpoint: '/api/tc/hotels/:id',
    in: {
        id: ['string', null, true],
        name: ['string'],
        stars: ['number'],
        description: ['string'],
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

        const item = await resources.hotels.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        const { id, ...fields } = properties;

        for(const [key, value] of Object.entries(fields))
        {
            if(value !== undefined)
            {
                item.Set(key, value);
            }
        }

        await item.Update();

        resolve({
            hotel: item.Get(['id', 'team_id', 'name', 'stars', 'description', 'link', 'images', 'city_id', 'updated_at', 'created_at'])
        });
    }
});
