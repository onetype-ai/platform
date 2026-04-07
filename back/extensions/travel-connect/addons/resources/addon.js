import onetype from '@onetype/framework';

const resources = onetype.Addon('tc.resources', (resources) =>
{
    resources.hotels = onetype.Addon('tc.resources.hotels', (addon) =>
    {
        addon.Table('tc_resources_hotels');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('stars', ['number']);
        addon.Field('description', ['string', null, true]);
        addon.Field('link', ['string']);
        addon.Field('images', ['array']);
        addon.Field('city_id', ['string']);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
        addon.Field('deleted_at', ['string']);
    });

    resources.cruisers = onetype.Addon('tc.resources.cruisers', (addon) =>
    {
        addon.Table('tc_resources_cruisers');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('company', ['string']);
        addon.Field('description', ['string', null, true]);
        addon.Field('video', ['string']);
        addon.Field('images', ['array']);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
        addon.Field('deleted_at', ['string']);
    });
});

export default resources;
