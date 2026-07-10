developer.Fn('list', function(query = '')
{
	const groups = {};
	const items = onetype.AddonGet('elements').Items();

	for(const item of Object.values(items))
	{
		if(!item.Get('icon') || !item.Get('name') || !item.Get('description') || !item.Get('category') || !item.Get('author') || !item.Get('collection'))
		{
			continue;
		}

		const name = item.Get('name');

		if(query && !name.toLowerCase().includes(query.toLowerCase()) && !item.Get('id').includes(query.toLowerCase()))
		{
			continue;
		}

		const category = item.Get('category');

		groups[category] ??= [];
		groups[category].push({
			id: item.Get('id'),
			icon: item.Get('icon') || 'widgets',
			name,
			description: item.Get('description') || ''
		});
	}

	return Object.keys(groups).sort().map((category) => ({
		category,
		items: groups[category].sort((first, second) => first.name.localeCompare(second.name))
	}));
});
