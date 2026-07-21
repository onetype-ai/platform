shortcuts.FnExpose('toggle', function(id, enabled)
{
	const item = this.ItemGet(id);

	if(item.Fn('enabled') === enabled)
	{
		return false;
	}

	this.Fn('save', id, { enabled: enabled === item.Get('enabled') ? undefined : enabled });

	onetype.Emit('platform.shortcuts.toggle', { id, enabled });

	return true;
});
