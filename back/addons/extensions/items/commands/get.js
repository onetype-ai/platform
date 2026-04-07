import commands from '@onetype/framework/commands';
import extensions from '#extensions/addon.js';

commands.Item({
    id: 'extensions:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/extensions/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        extension: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const item = await extensions.Find()
            .filter('id', properties.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ extension: item.Get(['id', 'name', 'slug', 'icon', 'description', 'config', 'categories', 'order', 'updated_at', 'created_at']) });
    }
});
