import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'elements:update',
    exposed: true,
    method: 'PUT',
    endpoint: '/api/elements/:id',
    in: {
        id: ['string', null, true],
        name: ['string'],
        data: ['object']
    },
    out: {
        element: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const element = await sites.elements.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!element)
        {
            return resolve(null, 'Not found.', 404);
        }

        const { id, ...fields } = properties;

        for(const [key, value] of Object.entries(fields))
        {
            if(value !== undefined)
            {
                element.Set(key, value);
            }
        }

        await element.Update();

        resolve({
            element: element.Get(['id', 'team_id', 'site_id', 'name', 'slug', 'data', 'updated_at', 'created_at'])
        });
    }
});
