import sites from '#sites/addon.js';

sites.Expose({
    filter: ['id', 'team_id', 'category_id', 'method', 'is_theme'],
    join: ['categories', 'fonts', 'extensions'],
    sort: ['name', 'created_at', 'updated_at'],
    select: [
        'id', 'team_id', 'name', 'category_id', 'description', 'color', 'colors', 'font_ids', 'extension_ids', 'method', 'is_theme', 'domains', 'updated_at', 'created_at'
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
