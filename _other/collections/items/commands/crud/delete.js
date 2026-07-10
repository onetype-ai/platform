import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';

commands.Item({
	id: 'collections:delete',
	exposed: true,
	method: 'DELETE',
	endpoint: '/api/collections/:id',
	description: 'Soft-delete a collection definition. The table and its data are kept.',
	in: {
		id: ['string', null, true]
	},
	out: 'collection',
	callback: async function(properties, resolve)
	{
		if(!this.http.state.user)
		{
			return resolve(null, 'Login required.', 401);
		}

		const result = await onetype.PipelineRun('collections:delete', {
			team_id: this.http.state.user.team.id,
			id: properties.id
		}, { state: this.http.state });

		if(result.code !== 200)
		{
			return resolve(null, result.message, result.code);
		}

		resolve(result.data.collection.GetData());
	}
});
