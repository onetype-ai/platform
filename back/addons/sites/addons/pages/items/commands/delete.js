import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'pages:delete',
    exposed: true,
    method: 'DELETE',
    endpoint: '/api/pages/:id',
    in: {
        id: ['string', null, true]
    },
    out: {},
    callback: async function(properties, resolve)
    {
        const page = await sites.pages.Find()
            .filter('id', properties.id)
            .one();

        if(!page)
        {
            return resolve(null, 'Not found.', 404);
        }

        await page.Delete();

        resolve({});
    }
});
