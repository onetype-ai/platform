import commands from '@onetype/framework/commands';
import offers from '#tc-offers/addon.js';

const FIELDS = [
    'id', 'team_id', 'name', 'code', 'type', 'status', 'description', 'videos', 'organization_id', 'stars',
    'cover_id', 'cover', 'old_id', 'slug', 'countries', 'areas', 'cities', 'score',
    'first_minute_start', 'first_minute_end', 'last_minute_start', 'last_minute_end', 'start_date', 'end_date',
    'latitude', 'longitude', 'video_source', 'image_source', 'notes', 'images', 'gallery',
    'amenities', 'transportation', 'embeds', 'tabs', 'search', 'data', 'pricing', 'pricing_convert',
    'priority', 'color', 'stickers', 'program', 'discount', 'transportation_pricing',
    'pricing_air', 'pricing_bus', 'pricing_own', 'departures', 'hotels', 'cruisers', 'excursions',
    'redirect', 'placements', 'placement_from', 'placement_to', 'updated_at', 'created_at'
];

commands.Item({
    id: 'tc.offers:list',
    exposed: true,
    method: 'GET',
    endpoint: '/api/tc/offers',
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
        offers: ['array', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        let query = offers.offers.Find().filter('team_id', user.team.id);

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

        resolve({ offers: items.map(item => item.Get(FIELDS)) });
    }
});
