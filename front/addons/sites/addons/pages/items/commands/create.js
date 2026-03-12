import commands from '@onetype/framework/commands';

commands.Item({
    id: 'editor:pages:create',
    exposed: true,
    description: 'Create a new editor page',
    in: {
        title: {
            type: 'string',
            description: 'Page title'
        },
        slug: {
            type: 'string',
            description: 'Page URL slug'
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
        const item = sites.pages.Fn('create', properties.title, properties.slug);

        $ot.command('editor:pages:activate', {id: item.Get('id')});

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
