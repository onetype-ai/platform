import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';

commands.Item({
	id: 'collections:items:create',
	exposed: true,
	method: 'POST',
	endpoint: '/api/collections/:slug/items',
	description: 'Create an item in a collection.',
	in: {
		slug: ['string', null, true],
		data: ['object', {}],
		language: ['string'],
		languages: ['array']
	},
	out: { item: ['object', null, true] },
	callback: async function(properties, resolve)
	{
		if(!this.http.state.user)
		{
			return resolve(null, 'Login required.', 401);
		}

		const result = await onetype.PipelineRun('collections:items:create', {
			team_id: this.http.state.user.team.id,
			slug: properties.slug,
			data: properties.data,
			language: properties.language || this.http.state.language || null,
			languages: this.http.state.languages || properties.languages || null
		}, { state: this.http.state });

		if(result.code !== 200)
		{
			return resolve(null, result.message, result.code);
		}

		resolve({ item: result.data.item.GetData() });
	}
});
