import packages from '#packages/addon.js';

packages.Fn('list', function()
{
	const list = {};

	for(const item of Object.values(this.Items()))
	{
		list[item.Get('slug')] = {
			...item.Get(['slug', 'name', 'version', 'description', 'icon', 'color', 'status', 'permissions', 'features', 'config']),
			limits: this.Fn('limits', item.Get('slug'))
		};
	}

	return list;
});
