import commands from '@onetype/framework/commands';
import extensions from '#extensions/addon.js';

commands.Item({
    id: 'extensions:list',
    exposed: true,
    method: 'GET',
    endpoint: '/api/extensions',
    in: {
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
        extensions: ['array', null, true]
    },
    callback: async function(properties, resolve)
    {
        let query = extensions.Find();

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

        resolve({ extensions: items.map(item => item.Get(['id', 'name', 'slug', 'icon', 'description', 'config', 'categories', 'order', 'updated_at', 'created_at'])) });
    }
});
