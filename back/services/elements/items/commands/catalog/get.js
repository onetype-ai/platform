import commands from '@onetype/framework/commands';

commands.Item({
	id: 'se:catalog:get',
	exposed: true,
	method: 'GET',
	endpoint: '/api/se/catalog/:id',
	in: {
		id: ['string', null, true]
	},
	out: {
		element: ['object']
	},
	callback: async function(properties, resolve)
	{
		const result = await commands.Fn('run', 'service:elements:catalog:get', properties);

		resolve(result.data);
	}
});
