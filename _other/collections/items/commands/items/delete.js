import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';

commands.Item({
	id: 'collections:items:delete',
	exposed: true,
	method: 'DELETE',
	endpoint: '/api/collections/:slug/items/:id',
	description: 'Delete an item in a collection (soft-delete).',
	in: {
		slug: ['string', null, true],
		id: ['string', null, true]
	},
	out: { item: ['object', null, true] },
	callback: async function(properties, resolve)
	{
		if(!this.http.state.user)
		{
			return resolve(null, 'Login required.', 401);
		}

		const result = await onetype.PipelineRun('collections:items:delete', {
			team_id: this.http.state.user.team.id,
			slug: properties.slug,
			id: properties.id
		}, { state: this.http.state });

		if(result.code !== 200)
		{
			return resolve(null, result.message, result.code);
		}

		resolve({ item: result.data.item.GetData() });
	}
});
