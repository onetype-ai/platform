import commands from '@onetype/framework/commands';
import offers from '#tc-offers/addon.js';

commands.Item({
    id: 'tc.offers:delete',
    exposed: true,
    method: 'DELETE',
    endpoint: '/api/tc/offers/:id',
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

        const item = await offers.offers.Find()
            .filter('id', properties.id)
            .filter('team_id', user.team.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        await item.Delete();

        resolve({});
    }
});
