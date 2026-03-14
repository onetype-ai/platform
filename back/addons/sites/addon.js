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
        addon.Field('is_home', ['boolean', false, true]);
        addon.Field('is_404', ['boolean', false, true]);
        addon.Field('order', ['number', 0, true]);
        addon.Field('code_head', ['string']);
        addon.Field('code_body', ['string']);
        addon.Field('seo_title', ['string']);
        addon.Field('seo_description', ['string']);
        addon.Field('seo_tags', ['array']);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
    });

    sites.sections = onetype.Addon('sites.sections', (addon) =>
    {
        addon.Table('sites_sections');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('site_id', ['string', null, true]);
        addon.Field('page_id', ['string', null, true]);
        addon.Field('order', ['number', 0, true]);
        addon.Field('columns', ['array', [], true]);
        addon.Field('padding', ['object', {}, true]);
        addon.Field('margin', ['object', {}, true]);
        addon.Field('gap', ['number', 16, true]);
        addon.Field('background', ['string', '', true]);
        addon.Field('border', ['object', {}, true]);
        addon.Field('container', ['string', 'm', true]);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
    });
});

export default sites;
