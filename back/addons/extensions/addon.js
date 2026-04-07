import onetype from '@onetype/framework';

const extensions = onetype.Addon('extensions', (addon) =>
{
    addon.Table('sites_extensions');

    addon.Field('id', ['string', null, true]);
    addon.Field('name', ['string', null, true]);
    addon.Field('slug', ['string', null, true]);
    addon.Field('icon', ['string', null, true]);
    addon.Field('description', ['string']);
    addon.Field('config', ['object', {}, true]);
    addon.Field('categories', ['array']);
    addon.Field('order', ['number', 0, true]);
    addon.Field('updated_at', ['string']);
    addon.Field('created_at', ['string']);

    addon.installs = onetype.Addon('extensions.installs', (addon) =>
    {
        addon.Table('sites_extensions_installs');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('site_id', ['string', null, true]);
        addon.Field('extension_id', ['string', null, true]);
        addon.Field('config', ['object', {}, true]);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
        addon.Field('deleted_at', ['string']);
    });
});

export default extensions;
