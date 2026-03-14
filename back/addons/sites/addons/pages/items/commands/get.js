import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'pages:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/pages/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        page: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = await sites.pages.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ page: item.Get(['id', 'team_id', 'site_id', 'title', 'route', 'is_home', 'is_404', 'order', 'code_head', 'code_body', 'seo_title', 'seo_description', 'seo_tags', 'updated_at', 'created_at']) });
    }
});
