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

        const [js, css] = await Promise.all([
            commands.Fn('run', 'service:elements:catalog:bundle:js', { slugs: [properties.slug] }),
            commands.Fn('run', 'service:elements:catalog:bundle:css', { slugs: [properties.slug] })
        ]);

        const code = Object.values(js.data.js).join('\n');
        const style = Object.values(css.data.css).join('\n');

        const catalog = await commands.Fn('run', 'service:elements:catalog:get', { slug: properties.slug });
        const config = catalog.data.element.config;

        const element = sites.elements.Item({
            team_id: user.team.id,
            site_id: properties.site_id,
            name: properties.name,
            slug: properties.slug,
            data: {},
            code,
            style,
            config
        });

        await element.Create();

        resolve({
            element: element.Get(['id', 'team_id', 'site_id', 'name', 'slug', 'data', 'code', 'style', 'config', 'updated_at', 'created_at'])
        });
    }
});
