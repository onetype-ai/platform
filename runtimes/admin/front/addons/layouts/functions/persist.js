ui.layouts.Fn('persist', function()
{
	const active = {};

	Object.values(this.Items()).forEach((item) =>
	{
		active[item.Get('id')] = item.Get('isActive');
	});

	$ot.modules.settings.set('ui.layouts.active', active);

	return active;
});
