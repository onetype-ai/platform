import directories from '#tc-directories/addon.js';

directories.amenities.Expose({
    filter: ['id', 'team_id', 'name', 'popular'],
    sort: ['name', 'order', 'created_at', 'updated_at'],
    select: [
        'id', 'team_id', 'name', 'description', 'order', 'popular', 'icon_id', 'icon', 'types', 'updated_at', 'created_at'
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
