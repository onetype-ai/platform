import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sections:delete',
    exposed: true,
    method: 'DELETE',
    endpoint: '/api/sections/:id',
    in: {
        id: ['string', null, true]
    },
    out: {},
    callback: async function(properties, resolve)
    {
        const section = await sites.sections.Find()
            .filter('id', properties.id)
            .one();

        if(!section)
        {
            return resolve(null, 'Not found.', 404);
        }

        await section.Delete();

        resolve({});
    }
});
