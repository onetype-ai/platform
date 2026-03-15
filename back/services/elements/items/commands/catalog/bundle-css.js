import commands from '@onetype/framework/commands';

commands.Item({
	id: 'se:catalog:bundle:css',
	exposed: true,
	method: 'POST',
	endpoint: '/api/se/catalog/bundle/css',
	in: {
		ids: ['array', null, true]
	},
	out: {
		css: ['object']
	},
	callback: async function(properties, resolve)
	{
		const result = await commands.Fn('run', 'service:elements:catalog:bundle:css', properties);

		resolve(result.data);
	}
});
