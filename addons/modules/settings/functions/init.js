modules.settings.Fn('init', function()
{
	if(onetype.iframe)
	{
		return;
	}

	const raw = localStorage.getItem('onetype.settings');

	if(!raw)
	{
		return;
	}

	let data;

	try
	{
		data = JSON.parse(raw);
	}
	catch(error)
	{
		return;
	}

	Object.entries(data).forEach(([id, value]) =>
	{
		let item = this.ItemGet(id);

		if(!item)
		{
			item = this.Item({ id });
		}

		item.Set('value', value);

		onetype.Emit('modules.settings.change', { id, value });
	});
});
