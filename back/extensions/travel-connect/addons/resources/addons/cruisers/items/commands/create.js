import commands from '@onetype/framework/commands';
import resources from '#tc-resources/addon.js';

commands.Item({
    id: 'tc.cruisers:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/tc/cruisers',
    in: {
        name: ['string', null, true],
        company: ['string'],
        description: ['string', null, true],
        video: ['string'],
        images: ['array']
    },
    out: {
        cruiser: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const item = resources.cruisers.Item({
            team_id: user.team.id,
            name: properties.name,
            company: properties.company,
            description: properties.description,
            video: properties.video,
            images: properties.images
        });

        await item.Create();

        resolve({
            cruiser: item.Get(['id', 'team_id', 'name', 'company', 'description', 'video', 'images', 'updated_at', 'created_at'])
        });
    }
});
