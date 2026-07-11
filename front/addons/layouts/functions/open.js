ui.layouts.Fn('open', function(id, data)
{
	const item = this.ItemGet(id);

	if(!item)
	{
		return false;
	}

	if(data)
	{
		this.StoreSet('values.' + id, data);
	}

	if(item.Get('isActive'))
	{
		return false;
	}

	item.Set('isActive', true);

	this.Fn('persist');

	onetype.Emit('ui.layouts.open', { ids: [id] });

	return true;
});
