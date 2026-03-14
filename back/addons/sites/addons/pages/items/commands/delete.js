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

        await page.Delete();

        resolve({});
    }
});
