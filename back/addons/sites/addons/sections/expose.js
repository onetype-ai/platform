import sites from '#sites/addon.js';

sites.sections.Expose({
    filter: ['id', 'team_id', 'site_id', 'page_id'],
    sort: ['order', 'updated_at', 'created_at'],
    select: [
        'id', 'team_id', 'site_id', 'page_id', 'order', 'columns', 'padding', 'margin', 'gap', 'background', 'border', 'container', 'updated_at', 'created_at'
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
