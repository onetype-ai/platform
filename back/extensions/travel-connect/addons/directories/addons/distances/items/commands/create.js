import commands from '@onetype/framework/commands';
import directories from '#tc-directories/addon.js';

const FIELDS = ['id', 'team_id', 'name', 'description', 'order', 'popular', 'icon_id', 'icon', 'updated_at', 'created_at'];

commands.Item({
    id: 'tc.distances:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/tc/distances',
    in: {
        name: ['string', null, true],
        description: ['string'],
        order: ['number'],
        popular: ['boolean'],
        icon_id: ['string'],
        icon: ['object']
    },
    out: {
        distance: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = directories.distances.Item({
            team_id: user.team.id,
            ...properties
        });

        await item.Create();

        resolve({ distance: item.Get(FIELDS) });
    }
});
