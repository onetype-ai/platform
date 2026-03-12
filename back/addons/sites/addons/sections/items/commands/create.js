import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sections:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/sections',
    in: {
        team_id: ['string', null, true],
        page_id: ['string', null, true],
        order: ['number', 0]
    },
    out: {
        section: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const section = sites.sections.Item({
            team_id: properties.team_id,
            page_id: properties.page_id,
            order: properties.order
        });

        await section.Create();

        resolve({
            section: section.Get(['id', 'team_id', 'page_id', 'order', 'updated_at', 'created_at'])
        });
    }
});
