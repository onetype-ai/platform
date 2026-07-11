ui.layouts.Fn('restore', function()
{
	const active = $ot.modules.settings.get('ui.layouts.active', {});
	const opened = [];

	Object.entries(active).forEach(([id, open]) =>
	{
		const item = this.ItemGet(id);

		if(!item)
		{
			return;
		}

		item.Set('isActive', open, false);

		if(open)
		{
			opened.push(id);
		}
	});

	onetype.Emit('ui.layouts.open', { ids: opened });

	return active;
});
