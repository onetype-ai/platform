import commands from '@onetype/framework/commands';
import locations from '#tc-locations/addon.js';

const FIELDS = ['id', 'team_id', 'name', 'basic_description', 'medium_description', 'advanced_description', 'video_url', 'website_url', 'country_id', 'area_id', 'images', 'gallery', 'updated_at', 'created_at'];

commands.Item({
    id: 'tc.cities:list',
    exposed: true,
    method: 'GET',
    endpoint: '/api/tc/cities',
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
        cities: ['array', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        let query = locations.cities.Find().filter('team_id', user.team.id);

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

        resolve({ cities: items.map(item => item.Get(FIELDS)) });
    }
});
