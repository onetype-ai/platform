import commands from '@onetype/framework/commands';
import offers from '#tc-offers/addon.js';

commands.Item({
    id: 'tc.offers.categories:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/tc/offers/categories/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        category: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const item = offers.categories.Item(Number(properties.id));

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ category: item.Get(['id', 'slug', 'icon', 'title', 'description', 'image']) });
    }
});
