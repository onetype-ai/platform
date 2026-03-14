import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sections:update',
    exposed: true,
    method: 'PUT',
    endpoint: '/api/sections/:id',
    in: {
        id: ['string', null, true],
        order: ['number'],
        columns: ['array'],
        padding: ['object'],
        margin: ['object'],
        gap: ['number'],
        background: ['string'],
        border: ['object'],
        container: ['string']
    },
    out: {
        section: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const section = await sites.sections.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!section)
        {
            return resolve(null, 'Not found.', 404);
        }

        const { id, ...fields } = properties;

        for(const [key, value] of Object.entries(fields))
        {
            if(value !== undefined)
            {
                section.Set(key, value);
            }
        }

        await section.Update();

        resolve({
            section: section.Get(['id', 'team_id', 'site_id', 'page_id', 'order', 'columns', 'padding', 'margin', 'gap', 'background', 'border', 'container', 'updated_at', 'created_at'])
        });
    }
});
