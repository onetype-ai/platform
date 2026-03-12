import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'pages:list',
    exposed: true,
    method: 'GET',
    endpoint: '/api/pages',
    in: {
        site_id: ['string', null, true],
        filters: {
            type: 'array',
            each: {
                type: 'object',
                config: 'filter'
            }
        },
        limit: ['number'],
        offset: ['number']
    },
    out: {
        pages: ['array', null, true]
    },
    callback: async function(properties, resolve)
    {
        let query = sites.pages.Find()
            .filter('site_id', properties.site_id);

        if(properties.filters)
        {
            properties.filters.forEach(filter =>
            {
                query = query.filter(filter.field, filter.value, filter.operator || 'EQUALS');
            });
        }

        if(properties.limit)
        {
            query = query.limit(properties.limit);
        }

        if(properties.offset)
        {
            query = query.offset(properties.offset);
        }

        const items = await query.many();

        resolve({ pages: items.map(item => item.Get(['id', 'team_id', 'site_id', 'title', 'route', 'updated_at', 'created_at'])) });
    }
});
