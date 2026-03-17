import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'variables:update',
    exposed: true,
    method: 'PUT',
    endpoint: '/api/variables/:id',
    in: {
        id: ['string', null, true],
        name: ['string'],
        group: ['string'],
        type: ['string'],
        value: ['string'],
        values: ['array'],
        config: ['object']
    },
    out: {
        variable: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const variable = await sites.variables.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!variable)
        {
            return resolve(null, 'Not found.', 404);
        }

        const { id, ...fields } = properties;

        for(const [key, value] of Object.entries(fields))
        {
            if(value !== undefined)
            {
                variable.Set(key, value);
            }
        }

        await variable.Update();

        resolve({
            variable: variable.Get(['id', 'team_id', 'site_id', 'name', 'group', 'type', 'value', 'values', 'config', 'updated_at', 'created_at'])
        });
    }
});
