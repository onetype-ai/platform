import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sites:update',
    exposed: true,
    method: 'PUT',
    endpoint: '/api/sites/:id',
    in: {
        id: ['string', null, true],
        name: ['string'],
        category_id: ['string'],
        description: ['string'],
        color: ['string'],
        font_ids: ['array'],
        extension_ids: ['array'],
        method: ['string'],
        is_theme: ['boolean'],
        domains: ['array']
    },
    out: {
        site: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const site = await sites.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!site)
        {
            return resolve(null, 'Not found.', 404);
        }

        const { id, ...fields } = properties;

        for(const [key, value] of Object.entries(fields))
        {
            if(value !== undefined)
            {
                site.Set(key, value);
            }
        }

        await site.Update();

        resolve({
            site: site.Get(['id', 'team_id', 'name', 'category_id', 'description', 'color', 'font_ids', 'extension_ids', 'method', 'is_theme', 'domains', 'updated_at', 'created_at'])
        });
    }
});
