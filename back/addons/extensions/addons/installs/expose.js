import extensions from '#extensions/addon.js';

extensions.installs.Expose({
    filter: ['id', 'team_id', 'site_id', 'extension_id'],
    sort: ['updated_at', 'created_at'],
    select: [
        'id', 'team_id', 'site_id', 'extension_id', 'config', 'updated_at', 'created_at'
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
