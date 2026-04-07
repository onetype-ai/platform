import commands from '@onetype/framework/commands';
import directories from '#tc-directories/addon.js';

const FIELDS = ['id', 'team_id', 'name', 'description', 'order', 'popular', 'icon_id', 'icon', 'types', 'updated_at', 'created_at'];

commands.Item({
    id: 'tc.amenities:update',
    exposed: true,
    method: 'PUT',
    endpoint: '/api/tc/amenities/:id',
    in: {
        id: ['string', null, true],
        name: ['string'],
        description: ['string'],
        order: ['number'],
        popular: ['boolean'],
        icon_id: ['string'],
        icon: ['object'],
        types: ['array']
    },
    out: {
        amenity: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = await directories.amenities.Find()
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

        resolve({ amenity: item.Get(FIELDS) });
    }
});
