import sites from '#sites/addon.js';

sites.pages.Expose({
    filter: ['id', 'team_id', 'site_id'],
    sort: ['title', 'route', 'updated_at', 'created_at'],
    select: [
        'id', 'team_id', 'site_id', 'title', 'route', 'updated_at', 'created_at'
    ]
});
