import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sections:update',
    exposed: true,
    method: 'PUT',
    endpoint: '/api/sections/:id',
    in: {
        id: ['string', null, true],
        order: ['number']
    },
    out: {
        section: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const section = await sites.sections.Find()
            .filter('id', properties.id)
            .one();

        if(!section)
        {
            return resolve(null, 'Not found.', 404);
        }

        const { id, ...fields } = properties;

        for(const [key, value] of Object.entries(fields))
        {
            section.Set(key, value);
        }

        await section.Update();

        resolve({
            section: section.Get(['id', 'team_id', 'page_id', 'order', 'updated_at', 'created_at'])
        });
    }
});
