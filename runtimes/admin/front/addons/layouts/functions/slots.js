ui.layouts.Fn('slots', function(zone)
{
	const slots = {top: [], bottom: [], left: [], right: [], center: []};

	const data = this.Fn('data');

	Object.values(this.Items()).sort((a, b) => a.Get('order') - b.Get('order')).forEach((item) =>
	{
		if(item.Get('zone') !== zone)
		{
			return;
		}

		if(!item.Fn('visible'))
		{
			return;
		}

		slots[item.Get('slot')].push({
			id: item.Get('id'),
			data: { ...data, ...(this.StoreGet('values.' + item.Get('id')) || {}) }
		});
	});

	return slots;
});
