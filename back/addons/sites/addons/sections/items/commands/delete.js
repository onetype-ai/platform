import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sections:delete',
    exposed: true,
    method: 'DELETE',
    endpoint: '/api/sections/:id',
    in: {
        id: ['string', null, true]
    },
    out: {},
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

        await section.Delete();

        resolve({});
    }
});
