import commands from '@onetype/framework/commands';

commands.Item({
    id: 'editor:pages:activate',
    exposed: true,
    description: 'Activate an editor page by ID',
    in: {
        id: {
            type: 'string',
            required: true,
            description: 'Page ID to activate'
        }
    },
    out: {
        page: {
            type: 'object',
            config: {
                id: ['string'],
                title: ['string'],
                slug: ['string'],
                order: ['number']
            }
        }
    },
    callback: function(properties, resolve)
    {
        const item = sites.pages.Fn('activate', properties.id);

        if(!item)
        {
            resolve(null, 'Page not found', 404);
            return;
        }

        resolve({
            page: {
                id: item.Get('id'),
                title: item.Get('title'),
                slug: item.Get('slug'),
                order: item.Get('order')
            }
        });
    }
});
