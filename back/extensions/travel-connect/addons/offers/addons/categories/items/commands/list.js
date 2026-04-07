import commands from '@onetype/framework/commands';
import offers from '#tc-offers/addon.js';

commands.Item({
    id: 'tc.offers.categories:list',
    exposed: true,
    method: 'GET',
    endpoint: '/api/tc/offers/categories',
    in: {},
    out: {
        categories: ['array', null, true]
    },
    callback: async function(properties, resolve)
    {
        const items = Object.values(offers.categories.Items()).map(item => item.Get(['id', 'slug', 'icon', 'title', 'description', 'image']));

        resolve({ categories: items });
    }
});
