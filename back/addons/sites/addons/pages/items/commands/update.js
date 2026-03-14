import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'pages:update',
    exposed: true,
    method: 'PUT',
    endpoint: '/api/pages/:id',
    in: {
        id: ['string', null, true],
        title: ['string'],
        route: ['string'],
        is_home: ['boolean'],
        is_404: ['boolean'],
        code_head: ['string'],
        code_body: ['string'],
        seo_title: ['string'],
        seo_description: ['string'],
        seo_tags: ['array']
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

        const page = await sites.pages.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!page)
        {
            return resolve(null, 'Not found.', 404);
        }

        const { id, ...fields } = properties;

        for(const [key, value] of Object.entries(fields))
        {
            if(value !== undefined)
            {
                page.Set(key, value);
            }
        }

        await page.Update();

        resolve({
            page: page.Get(['id', 'team_id', 'site_id', 'title', 'route', 'is_home', 'is_404', 'order', 'code_head', 'code_body', 'seo_title', 'seo_description', 'seo_tags', 'updated_at', 'created_at'])
        });
    }
});
