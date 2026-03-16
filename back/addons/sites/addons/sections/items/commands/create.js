import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sections:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/sections',
    in: {
        site_id: ['string', null, true],
        page_id: ['string', null, true],
        order: ['number', 0]
    },
    out: {
        section: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const section = sites.sections.Item({
            team_id: user.team.id,
            site_id: properties.site_id,
            page_id: properties.page_id,
            order: properties.order,
            columns: [{ width: '1fr', element: null, data: {} }],
            gap: 16,
            container: 'm'
        });

        await section.Create();

        resolve({
            section: section.Get(['id', 'team_id', 'site_id', 'page_id', 'order', 'columns', 'padding', 'margin', 'gap', 'background', 'border', 'container', 'updated_at', 'created_at'])
        });
    }
});
