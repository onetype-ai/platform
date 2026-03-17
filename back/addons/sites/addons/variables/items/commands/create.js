import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'variables:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/variables',
    in: {
        site_id: ['string', null, true],
        name: ['string', null, true],
        group: ['string', '', true],
        type: ['string', 'text', true],
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

        const variable = sites.variables.Item({
            team_id: user.team.id,
            site_id: properties.site_id,
            name: properties.name,
            group: properties.group,
            type: properties.type,
            value: properties.value,
            values: properties.values,
            config: properties.config
        });

        await variable.Create();

        resolve({
            variable: variable.Get(['id', 'team_id', 'site_id', 'name', 'group', 'type', 'value', 'values', 'config', 'updated_at', 'created_at'])
        });
    }
});
