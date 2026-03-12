import onetype from '@onetype/framework';

const sites = onetype.Addon('sites', (sites) =>
{
    sites.Table('sites');

    sites.Field('id', ['string']);
    sites.Field('team_id', ['string']);
    sites.Field('name', ['string', null, true]);
    sites.Field('category_id', ['string']);
    sites.Field('category', ['object']);
    sites.Field('description', ['string']);
    sites.Field('color', ['string']);
    sites.Field('font_ids', ['array']);
    sites.Field('fonts', ['array']);
    sites.Field('extension_ids', ['array']);
    sites.Field('extensions', ['array']);
    sites.Field('method', ['string']);
    sites.Field('is_theme', ['boolean', false, true]);
    sites.Field('domains', ['array']);
    sites.Field('updated_at', ['string']);
    sites.Field('created_at', ['string']);
    sites.Field('deleted_at', ['string']);

    sites.pages = onetype.Addon('sites.pages', (addon) =>
    {
        addon.Table('sites_pages');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('site_id', ['string', null, true]);
        addon.Field('title', ['string', null, true]);
        addon.Field('route', ['string', null, true]);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
    });

    sites.sections = onetype.Addon('sites.sections', (addon) =>
    {
        addon.Table('sites_sections');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('page_id', ['string', null, true]);
        addon.Field('order', ['number', 0, true]);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
    });
});

export default sites;
