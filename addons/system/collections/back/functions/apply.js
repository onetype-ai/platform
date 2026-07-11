import collections from '../addon.js';

collections.Fn('apply', async function(item)
{
	await collections.Fn('partition', item.Get('id'));

	const runtime = collections.Fn('materialize', item.GetData());

	await runtime.SchemaRun();

	return runtime;
});
