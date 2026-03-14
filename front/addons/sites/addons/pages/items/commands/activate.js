import commands from '@onetype/framework/commands';

commands.Item({
    id: 'editor:pages:activate',
    exposed: true,
    description: 'Activate a page by ID',
    in: {
        id: {
            type: 'string',
            required: true,
            description: 'Page ID to activate'
        }
    },
    out: {
        page: ['object']
    },
    callback: function(properties, resolve)
    {
        const item = sites.pages.Fn('activate', properties.id);

        if(!item)
        {
            return resolve(null, 'Page not found.', 404);
        }

        resolve({ page: item.data });
    }
});
