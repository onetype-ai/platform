import commands from '@onetype/framework/commands';

commands.Item({
	id: 'se:categories:list',
	exposed: true,
	method: 'GET',
	endpoint: '/api/se/categories',
	out: {
		categories: ['array']
	},
	callback: async function(properties, resolve)
	{
		const result = await commands.Fn('run', 'service:elements:categories:list', properties);

		resolve(result.data);
	}
});
