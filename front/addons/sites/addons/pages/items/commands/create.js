import commands from '@onetype/framework/commands';

commands.Item({
    id: 'editor:pages:create',
    exposed: true,
    description: 'Create a new page',
    in: {
        title: {
            type: 'string',
            description: 'Page title'
        },
        route: {
            type: 'string',
            description: 'Page route'
        }
    },
    out: {
        page: ['object']
    },
    callback: async function(properties, resolve)
    {
        const item = await sites.pages.Fn('create', properties.title, properties.route);

        if(!item)
        {
            return resolve(null, 'Failed to create page.', 500);
        }

        $ot.command('editor:pages:activate', { id: item.Get('id') });

        resolve({ page: item.data });
    }
});
