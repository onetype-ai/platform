ui.dock.Fn('close', function()
{
	const item = Object.values(this.Items()).find((item) => item.Get('isOpen'));

	if(!item)
	{
		return false;
	}

	item.Set('isOpen', false);

	onetype.Emit('ui.dock.close', {});

	return true;
});
