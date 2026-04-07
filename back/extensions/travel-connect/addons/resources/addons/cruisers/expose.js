import resources from '#tc-resources/addon.js';

resources.cruisers.Expose({
    filter: ['id', 'team_id', 'name', 'company'],
    sort: ['name', 'created_at', 'updated_at'],
    select: [
        'id', 'team_id', 'name', 'company', 'description', 'video', 'images', 'updated_at', 'created_at'
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
