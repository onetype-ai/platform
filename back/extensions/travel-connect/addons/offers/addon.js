import onetype from '@onetype/framework';

const offers = onetype.Addon('tc.offers', (offers) =>
{
    offers.offers = onetype.Addon('tc.offers.offers', (addon) =>
    {
        addon.Table('tc_offers');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('code', ['string']);
        addon.Field('type', ['array']);
        addon.Field('status', ['string', 'Nacrt']);
        addon.Field('description', ['string', null, true]);
        addon.Field('videos', ['array']);
        addon.Field('organization_id', ['string', null, true]);
        addon.Field('stars', ['number']);
        addon.Field('cover_id', ['string']);
        addon.Field('cover', ['object']);
        addon.Field('old_id', ['number']);
        addon.Field('slug', ['string']);
        addon.Field('countries', ['array']);
        addon.Field('areas', ['array']);
        addon.Field('cities', ['array']);
        addon.Field('score', ['number']);
        addon.Field('first_minute_start', ['string']);
        addon.Field('first_minute_end', ['string']);
        addon.Field('last_minute_start', ['string']);
        addon.Field('last_minute_end', ['string']);
        addon.Field('start_date', ['string']);
        addon.Field('end_date', ['string']);
        addon.Field('latitude', ['string']);
        addon.Field('longitude', ['string']);
        addon.Field('video_source', ['string']);
        addon.Field('image_source', ['string']);
        addon.Field('notes', ['array']);
        addon.Field('images', ['array']);
        addon.Field('gallery', ['array']);
        addon.Field('amenities', ['array']);
        addon.Field('transportation', ['array']);
        addon.Field('embeds', ['array']);
        addon.Field('tabs', ['array']);
        addon.Field('search', ['string']);
        addon.Field('data', ['string']);
        addon.Field('pricing', ['string']);
        addon.Field('pricing_convert', ['boolean', false]);
        addon.Field('priority', ['number']);
        addon.Field('color', ['string']);
        addon.Field('stickers', ['array']);
        addon.Field('program', ['array']);
        addon.Field('discount', ['string']);
        addon.Field('transportation_pricing', ['string']);
        addon.Field('pricing_air', ['string']);
        addon.Field('pricing_bus', ['string']);
        addon.Field('pricing_own', ['string']);
        addon.Field('departures', ['array']);
        addon.Field('hotels', ['array']);
        addon.Field('cruisers', ['array']);
        addon.Field('excursions', ['array']);
        addon.Field('redirect', ['string']);
        addon.Field('placements', ['array']);
        addon.Field('placement_from', ['string']);
        addon.Field('placement_to', ['string']);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
        addon.Field('deleted_at', ['string']);
    });

    offers.categories = onetype.Addon('tc.offers.categories', (addon) =>
    {
        addon.Field('id', ['number']);
        addon.Field('slug', ['string']);
        addon.Field('icon', ['string']);
        addon.Field('title', ['string']);
        addon.Field('description', ['string']);
        addon.Field('image', ['string']);
    });
});

export default offers;
