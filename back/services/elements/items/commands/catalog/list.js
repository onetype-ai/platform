import commands from '@onetype/framework/commands';

commands.Item({
	id: 'se:catalog:list',
	exposed: true,
	method: 'GET',
	endpoint: '/api/se/catalog',
	in: {
		category_id: ['string']
	},
	out: {
		elements: ['array']
	},
	callback: async function(properties, resolve)
	{
		const result = await commands.Fn('run', 'service:elements:catalog:list', properties);

		resolve(result.data);
	}
});
