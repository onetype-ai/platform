developer.Fn('addons.list', function()
{
	const groups = [];

	for(const item of Object.values(developer.addons.Items()))
	{
		const group = item.Get('group').toUpperCase();
		let entry = groups.find((candidate) => candidate.group === group);

		if(!entry)
		{
			entry = { group: group, items: [] };
			groups.push(entry);
		}

		entry.items.push(item.Get(['id', 'name', 'description']));
	}

	for(const entry of groups)
	{
		entry.items.sort((left, right) => left.name.localeCompare(right.name));
	}

	return groups.sort((left, right) => left.group.localeCompare(right.group));
});
