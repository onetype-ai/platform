ui.canvas.Fn('regions', function(items)
{
	const padding = 24;
	const groups = this.Fn('groups');
	const members = {};

	(items || this.Fn('list')).forEach((item) =>
	{
		if(!item.group || !groups[item.group])
		{
			return;
		}

		if(!members[item.group])
		{
			members[item.group] = [];
		}

		members[item.group].push(item);
	});

	return Object.entries(members).map(([id, list]) =>
	{
		const left = Math.min(...list.map((item) => item.x));
		const top = Math.min(...list.map((item) => item.y));
		const right = Math.max(...list.map((item) => item.x + item.width));
		const bottom = Math.max(...list.map((item) => item.y + item.height));

		return {
			id,
			name: groups[id].name,
			color: groups[id].color || 'brand',
			members: list.map((item) => item.id),
			x: left - padding,
			y: top - padding,
			width: right - left + padding * 2,
			height: bottom - top + padding * 2
		};
	});
});
