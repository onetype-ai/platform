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
    id: 'tc.offers:update',
    exposed: true,
    method: 'PUT',
    endpoint: '/api/tc/offers/:id',
    in: {
        id: ['string', null, true],
        name: ['string'],
        code: ['string'],
        type: ['array'],
        status: ['string'],
        description: ['string'],
        videos: ['array'],
        organization_id: ['string'],
        stars: ['number'],
        cover_id: ['string'],
        cover: ['object'],
        slug: ['string'],
        countries: ['array'],
        areas: ['array'],
        cities: ['array'],
        score: ['number'],
        first_minute_start: ['string'],
        first_minute_end: ['string'],
        last_minute_start: ['string'],
        last_minute_end: ['string'],
        start_date: ['string'],
        end_date: ['string'],
        latitude: ['string'],
        longitude: ['string'],
        video_source: ['string'],
        image_source: ['string'],
        notes: ['array'],
        images: ['array'],
        gallery: ['array'],
        amenities: ['array'],
        transportation: ['array'],
        embeds: ['array'],
        tabs: ['array'],
        search: ['string'],
        data: ['string'],
        pricing: ['string'],
        pricing_convert: ['boolean'],
        priority: ['number'],
        color: ['string'],
        stickers: ['array'],
        program: ['array'],
        discount: ['string'],
        transportation_pricing: ['string'],
        pricing_air: ['string'],
        pricing_bus: ['string'],
        pricing_own: ['string'],
        departures: ['array'],
        hotels: ['array'],
        cruisers: ['array'],
        excursions: ['array'],
        redirect: ['string'],
        placements: ['array'],
        placement_from: ['string'],
        placement_to: ['string']
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

        const { id, ...fields } = properties;

        for(const [key, value] of Object.entries(fields))
        {
            if(value !== undefined)
            {
                item.Set(key, value);
            }
        }

        await item.Update();

        resolve({ offer: item.Get(FIELDS) });
    }
});
