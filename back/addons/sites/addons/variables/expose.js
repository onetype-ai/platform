import sites from '#sites/addon.js';

sites.variables.Expose({
    filter: ['id', 'team_id', 'site_id', 'group', 'type'],
    sort: ['name', 'group', 'updated_at', 'created_at'],
    select: [
        'id', 'team_id', 'site_id', 'name', 'group', 'type', 'value', 'values', 'config', 'updated_at', 'created_at'
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
