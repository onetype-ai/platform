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

offers.offers.Expose({
    filter: ['id', 'team_id', 'name', 'code', 'status', 'organization_id', 'slug'],
    sort: ['name', 'priority', 'score', 'created_at', 'updated_at', 'start_date', 'end_date'],
    select: FIELDS,
    callback: function(query)
    {
        const user = this.http.state.user;

        if(user)
        {
            query.filter('team_id', user.team.id);
        }
        else
        {
            query.filter('id', null, 'NULL');
        }
    }
});
