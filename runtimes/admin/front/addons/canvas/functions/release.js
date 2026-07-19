ui.canvas.Fn('release', function()
{
	const focused = $ot.modules.settings.get('ui.canvas.focus', null);

	if(!focused)
	{
		return null;
	}

	$ot.modules.settings.set('ui.canvas.focus', null);

	onetype.Emit('ui.canvas.blur', { id: focused.id });

	return focused.id;
});
