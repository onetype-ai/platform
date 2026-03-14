import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'pages:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/pages',
    in: {
        site_id: ['string', null, true],
        title: ['string', null, true],
        route: ['string', null, true]
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

        const page = sites.pages.Item({
            team_id: user.team.id,
            site_id: properties.site_id,
            title: properties.title,
            route: properties.route
        });

        await page.Create();

        resolve({
            page: page.Get(['id', 'team_id', 'site_id', 'title', 'route', 'is_home', 'is_404', 'order', 'code_head', 'code_body', 'seo_title', 'seo_description', 'seo_tags', 'updated_at', 'created_at'])
        });
    }
});
