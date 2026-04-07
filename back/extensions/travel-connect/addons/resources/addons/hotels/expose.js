import resources from '#tc-resources/addon.js';

resources.hotels.Expose({
    filter: ['id', 'team_id', 'name', 'stars', 'city_id'],
    sort: ['name', 'stars', 'created_at', 'updated_at'],
    select: [
        'id', 'team_id', 'name', 'stars', 'description', 'link', 'images', 'city_id', 'updated_at', 'created_at'
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
