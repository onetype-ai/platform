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
    sites.Field('colors', ['object', {
        'brand': 'rgba(226, 112, 85, 1)',
        'bg-1': 'rgba(29, 29, 31, 1)',
        'bg-2': 'rgba(34, 34, 36, 1)',
        'bg-3': 'rgba(39, 39, 41, 1)',
        'bg-4': 'rgba(44, 44, 46, 1)',
        'text-1': 'rgba(225, 228, 232, 1)',
        'text-2': 'rgba(156, 156, 156, 1)',
        'text-3': 'rgba(100, 100, 100, 1)',
        'blue': 'rgba(56, 189, 248, 1)',
        'red': 'rgba(244, 63, 94, 1)',
        'orange': 'rgba(251, 146, 60, 1)',
        'green': 'rgba(52, 211, 153, 1)'
    }, true]);
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

    sites.elements = onetype.Addon('sites.elements', (addon) =>
    {
        addon.Table('sites_elements');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('site_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('slug', ['string', null, true]);
        addon.Field('data', ['object', {}, true]);
        addon.Field('code', ['string', '', true]);
        addon.Field('style', ['string', '', true]);
        addon.Field('config', ['object', {}, true]);
        addon.Field('updated_at', ['string']);
        addon.Field('created_at', ['string']);
    });

    sites.variables = onetype.Addon('sites.variables', (addon) =>
    {
        addon.Table('sites_variables');

        addon.Field('id', ['string']);
        addon.Field('team_id', ['string', null, true]);
        addon.Field('site_id', ['string', null, true]);
        addon.Field('name', ['string', null, true]);
        addon.Field('group', ['string', '', true]);
        addon.Field('type', ['string', 'text', true]);
        addon.Field('value', ['string', '', true]);
        addon.Field('values', ['array', [], true]);
        addon.Field('config', ['object', {}, true]);
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
