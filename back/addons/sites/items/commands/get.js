import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sites:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/sites/:id',
    in: {
        id: ['string', null, true]
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

        const item = await sites.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ site: item.Get(['id', 'team_id', 'name', 'category_id', 'description', 'color', 'colors', 'font_ids', 'extension_ids', 'method', 'is_theme', 'domains', 'updated_at', 'created_at']) });
    }
});
