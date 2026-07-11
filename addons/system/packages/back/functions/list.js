import packages from '#packages/addon.js';

packages.Fn('list', function()
{
	return Object.values(this.Items()).map((item) =>
	{
		return {
			...item.Get(['slug', 'type', 'name', 'version', 'description', 'icon', 'color', 'status', 'permissions', 'features', 'config']),
			limits: this.Fn('limits', item.Get('slug'))
		};
	});
});
