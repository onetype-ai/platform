const sites = onetype.Addon('sites', (sites) =>
{
    sites.Field('id', ['string', null, true]);
    sites.Field('team_id', ['string', null, true]);
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
    sites.Field('updated_at', ['string', null, true]);
    sites.Field('created_at', ['string']);
    sites.Field('deleted_at', ['string']);

    sites.pages = onetype.Addon('sites.pages', (addon) =>
    {
        addon.Field('id', ['string']);
        addon.Field('title', ['string', null, true]);
        addon.Field('slug', ['string', null, true]);
        addon.Field('order', ['number', 0, true]);
        addon.Field('route', ['string', null, true]);
        addon.Field('active', ['boolean', false, true]);
    });

    sites.sections = onetype.Addon('sites.sections', (addon) =>
    {
        addon.Field('id', ['string']);
        addon.Field('page_id', ['string', null, true]);
        addon.Field('order', ['number', 0, true]);
        addon.Field('columns', ['array', [], true]);
        addon.Field('padding', ['object', null, true]);
        addon.Field('margin', ['object', null, true]);
        addon.Field('gap', ['number', 16, true]);
        addon.Field('background', ['string', null, true]);
        addon.Field('border', ['object', null, true]);
        addon.Field('container', ['boolean', true, true]);
    });
});
