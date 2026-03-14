import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sections:list',
    exposed: true,
    method: 'GET',
    endpoint: '/api/sections',
    in: {
        page_id: ['string', null, true],
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
        sections: ['array', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        let query = sites.sections.Find()
            .filter('team_id', user.team.id)
            .filter('page_id', properties.page_id);

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

        resolve({ sections: items.map(item => item.Get(['id', 'team_id', 'site_id', 'page_id', 'order', 'updated_at', 'created_at'])) });
    }
});
