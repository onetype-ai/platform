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
        route: ['string']
    },
    out: {
        page: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const page = await sites.pages.Find()
            .filter('id', properties.id)
            .one();

        if(!page)
        {
            return resolve(null, 'Not found.', 404);
        }

        const { id, ...fields } = properties;

        for(const [key, value] of Object.entries(fields))
        {
            page.Set(key, value);
        }

        await page.Update();

        resolve({
            page: page.Get(['id', 'team_id', 'site_id', 'title', 'route', 'updated_at', 'created_at'])
        });
    }
});
