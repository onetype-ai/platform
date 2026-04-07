import onetype from '@onetype/framework';

const directories = onetype.Addon('tc.directories', (directories) =>
{
    directories.amenities = onetype.Addon('tc.directories.amenities', (addon) =>
    {
        addon.Table('tc_directories_amenities');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('description', ['string']);
        addon.Field('order', ['number']);
        addon.Field('popular', ['boolean', false]);
        addon.Field('icon_id', ['string']);
        addon.Field('icon', ['object']);
        addon.Field('types', ['array']);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
        addon.Field('deleted_at', ['string']);
    });

    directories.distances = onetype.Addon('tc.directories.distances', (addon) =>
    {
        addon.Table('tc_directories_distances');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('description', ['string']);
        addon.Field('order', ['number']);
        addon.Field('popular', ['boolean', false]);
        addon.Field('icon_id', ['string']);
        addon.Field('icon', ['object']);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
        addon.Field('deleted_at', ['string']);
    });

    directories.services = onetype.Addon('tc.directories.services', (addon) =>
    {
        addon.Table('tc_directories_services');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('description', ['string']);
        addon.Field('order', ['number']);
        addon.Field('popular', ['boolean', false]);
        addon.Field('icon_id', ['string']);
        addon.Field('icon', ['object']);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
        addon.Field('deleted_at', ['string']);
    });

    directories.transportation = onetype.Addon('tc.directories.transportation', (addon) =>
    {
        addon.Table('tc_directories_transportation');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('description', ['string']);
        addon.Field('order', ['number']);
        addon.Field('popular', ['boolean', false]);
        addon.Field('icon_id', ['string']);
        addon.Field('icon', ['object']);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
        addon.Field('deleted_at', ['string']);
    });
});

export default directories;
