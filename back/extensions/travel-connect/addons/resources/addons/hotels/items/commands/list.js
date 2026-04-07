import commands from '@onetype/framework/commands';
import resources from '#tc-resources/addon.js';

commands.Item({
    id: 'tc.hotels:list',
    exposed: true,
    method: 'GET',
    endpoint: '/api/tc/hotels',
    in: {
        filters: {
            type: 'array',
            each: {
                type: 'object',
                config: 'filter'
            }
        },
        limit: ['number'],
        offset: ['number']
    },
    out: {
        hotels: ['array', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        let query = resources.hotels.Find().filter('team_id', user.team.id);

        if(properties.filters)
        {
            properties.filters.forEach(filter =>
            {
                query = query.filter(filter.field, filter.value, filter.operator || 'EQUALS');
            });
        }

        if(properties.limit)
        {
            query = query.limit(properties.limit);
        }

        if(properties.offset)
        {
            query = query.offset(properties.offset);
        }

        const items = await query.many();

        resolve({ hotels: items.map(item => item.Get(['id', 'team_id', 'name', 'stars', 'description', 'link', 'images', 'city_id', 'updated_at', 'created_at'])) });
    }
});
