ui.modes.Fn('active', function()
{
	const active = $ot.modules.settings.get('ui.modes.active', []);
	const visible = Object.values(this.Items()).filter((item) => item.Fn('visible'));

	const current = visible.find((item) => active.includes(item.Get('id')));

	if(current)
	{
		return current;
	}

	return visible.find((item) => item.Get('isDefault')) || null;
});
