import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';

commands.Item({
	id: 'collections:create',
	exposed: true,
	method: 'POST',
	endpoint: '/api/collections',
	description: 'Create a collection definition and materialize its table.',
	in: {
		slug: ['string', null, true],
		name: ['string', null, true],
		icon: ['string', ''],
		kind: ['string', 'list'],
		fields: ['array', []]
	},
	out: 'collection',
	callback: async function(properties, resolve)
	{
		if(!this.http.state.user)
		{
			return resolve(null, 'Login required.', 401);
		}

		const result = await onetype.PipelineRun('collections:create', {
			team_id: this.http.state.user.team.id,
			slug: properties.slug,
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
