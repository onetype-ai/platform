ui.screens.Fn('active', function()
{
	const id = $ot.modules.settings.get('ui.screens.active', null);

	return id ? this.ItemGet(id) || null : null;
});
