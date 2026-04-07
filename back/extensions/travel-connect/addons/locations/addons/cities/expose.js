import locations from '#tc-locations/addon.js';

locations.cities.Expose({
    filter: ['id', 'team_id', 'name', 'country_id', 'area_id'],
    sort: ['name', 'created_at', 'updated_at'],
    select: [
        'id', 'team_id', 'name', 'basic_description', 'medium_description', 'advanced_description', 'video_url', 'website_url', 'country_id', 'area_id', 'images', 'gallery', 'updated_at', 'created_at'
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
