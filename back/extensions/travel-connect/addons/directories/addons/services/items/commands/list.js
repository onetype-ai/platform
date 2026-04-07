import commands from '@onetype/framework/commands';
import directories from '#tc-directories/addon.js';

const FIELDS = ['id', 'team_id', 'name', 'description', 'order', 'popular', 'icon_id', 'icon', 'updated_at', 'created_at'];

commands.Item({
    id: 'tc.services:list',
    exposed: true,
    method: 'GET',
    endpoint: '/api/tc/services',
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
        services: ['array', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        let query = directories.services.Find().filter('team_id', user.team.id);

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

        resolve({ services: items.map(item => item.Get(FIELDS)) });
    }
});
