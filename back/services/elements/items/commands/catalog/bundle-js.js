import commands from '@onetype/framework/commands';

commands.Item({
	id: 'se:catalog:bundle:js',
	exposed: true,
	method: 'POST',
	endpoint: '/api/se/catalog/bundle/js',
	in: {
		ids: ['array', null, true]
	},
	out: {
		js: ['object']
	},
	callback: async function(properties, resolve)
	{
		const result = await commands.Fn('run', 'service:elements:catalog:bundle:js', properties);

		resolve(result.data);
	}
});
