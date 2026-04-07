import onetype from '@onetype/framework';

const locations = onetype.Addon('tc.locations', (locations) =>
{
    locations.countries = onetype.Addon('tc.locations.countries', (addon) =>
    {
        addon.Table('tc_locations_countries');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('basic_description', ['string']);
        addon.Field('medium_description', ['string']);
        addon.Field('advanced_description', ['string']);
        addon.Field('video_url', ['string']);
        addon.Field('website_url', ['string']);
        addon.Field('images', ['array']);
        addon.Field('gallery', ['array']);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
        addon.Field('deleted_at', ['string']);
    });

    locations.areas = onetype.Addon('tc.locations.areas', (addon) =>
    {
        addon.Table('tc_locations_areas');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('type', ['string']);
        addon.Field('group', ['string']);
        addon.Field('basic_description', ['string']);
        addon.Field('medium_description', ['string']);
        addon.Field('advanced_description', ['string']);
        addon.Field('video_url', ['string']);
        addon.Field('website_url', ['string']);
        addon.Field('country_id', ['string']);
        addon.Field('images', ['array']);
        addon.Field('gallery', ['array']);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
        addon.Field('deleted_at', ['string']);
    });

    locations.cities = onetype.Addon('tc.locations.cities', (addon) =>
    {
        addon.Table('tc_locations_cities');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('basic_description', ['string']);
        addon.Field('medium_description', ['string']);
        addon.Field('advanced_description', ['string']);
        addon.Field('video_url', ['string']);
        addon.Field('website_url', ['string']);
        addon.Field('country_id', ['string']);
        addon.Field('area_id', ['string']);
        addon.Field('images', ['array']);
        addon.Field('gallery', ['array']);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
        addon.Field('deleted_at', ['string']);
    });

    locations.attractions = onetype.Addon('tc.locations.attractions', (addon) =>
    {
        addon.Table('tc_locations_attractions');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('basic_description', ['string']);
        addon.Field('medium_description', ['string']);
        addon.Field('advanced_description', ['string']);
        addon.Field('video_url', ['string']);
        addon.Field('website_url', ['string']);
        addon.Field('city_id', ['string']);
        addon.Field('images', ['array']);
        addon.Field('gallery', ['array']);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
        addon.Field('deleted_at', ['string']);
    });
});

export default locations;
