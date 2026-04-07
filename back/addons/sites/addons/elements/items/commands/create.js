import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'elements:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/elements',
    in: {
        site_id: ['string', null, true],
        name: ['string', null, true],
        slug: ['string', null, true]
    },
    out: {
        element: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const element = sites.elements.Item({
            team_id: user.team.id,
            site_id: properties.site_id,
            name: properties.name,
            slug: properties.slug,
            data: {}
        });

        await element.Create();

        resolve({
            element: element.Get(['id', 'team_id', 'site_id', 'name', 'slug', 'data', 'updated_at', 'created_at'])
        });
    }
});
