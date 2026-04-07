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
    id: 'tc.offers:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/tc/offers/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        offer: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = await offers.offers.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ offer: item.Get(FIELDS) });
    }
});
