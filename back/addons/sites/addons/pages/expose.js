import sites from '#sites/addon.js';

sites.pages.Expose({
    filter: ['id', 'team_id', 'site_id'],
    sort: ['title', 'route', 'updated_at', 'created_at'],
    select: [
        'id', 'team_id', 'site_id', 'title', 'route', 'is_home', 'is_404', 'order', 'code_head', 'code_body', 'seo_title', 'seo_description', 'seo_tags', 'updated_at', 'created_at'
    ],
    callback: function(query)
    {
        const user = this.http.state.user;

        if(user)
        {
            query.filter('team_id', user.team.id);
        }
        else
        {
            query.filter('id', null, 'NULL');
        }
    }
});