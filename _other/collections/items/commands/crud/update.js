import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';

commands.Item({
	id: 'collections:update',
	exposed: true,
	method: 'PATCH',
	endpoint: '/api/collections/:id',
	description: 'Update a collection definition and re-materialize its table.',
	in: {
		id: ['string', null, true],
		name: ['string'],
		icon: ['string'],
		kind: ['string'],
		fields: ['array']
	},
	out: 'collection',
	callback: async function(properties, resolve)
	{
		if(!this.http.state.user)
		{
			return resolve(null, 'Login required.', 401);
		}

		const result = await onetype.PipelineRun('collections:update', {
			team_id: this.http.state.user.team.id,
			id: properties.id,
			name: properties.name,
			icon: properties.icon,
			kind: properties.kind,
			fields: properties.fields
		}, { state: this.http.state });

		if(result.code !== 200)
		{
			return resolve(null, result.message, result.code);
		}

		resolve(result.data.collection.GetData());
	}
});
