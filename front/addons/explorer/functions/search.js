ui.explorer.Fn('search', function(query)
{
	let text = (query || '').trim().toLowerCase();
	let only = null;

	const match = text.match(/^([a-z]+):\s*(.*)$/);

	if(match && Object.values(this.Items()).some((item) => item.Get('prefix') === match[1]))
	{
		only = match[1];
		text = match[2].trim();
	}

	const groups = {};

	for(const item of Object.values(this.Items()))
	{
		if(only && item.Get('prefix') !== only)
		{
			continue;
		}

		if(!item.Fn('visible'))
		{
			continue;
		}

		if(text && !(item.Get('label') + ' ' + item.Get('hint') + ' ' + item.Get('keywords').join(' ')).toLowerCase().includes(text))
		{
			continue;
		}

		const name = item.Get('group');
		const group = groups[name] = groups[name] || { id: name, group: name, order: item.Get('order'), results: [] };

		group.order = Math.min(group.order, item.Get('order'));
		group.results.push({ id: item.Get('id'), icon: item.Get('icon'), label: item.Get('label'), hint: item.Get('hint') });
	}

	return Object.values(groups).sort((a, b) => a.order - b.order).map((group) =>
	{
		group.results = group.results.sort((a, b) => a.label.localeCompare(b.label)).slice(0, only ? 15 : 5);

		return group;
	});
});
