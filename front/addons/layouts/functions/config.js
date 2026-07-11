ui.layouts.Fn('config', function()
{
	const config = {};

	Object.values(this.Items()).forEach((item) =>
	{
		Object.assign(config, item.Get('config'));
	});

	return config;
});
