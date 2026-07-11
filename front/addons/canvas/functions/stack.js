ui.canvas.Fn('stack', function(items)
{
	const margin = 48;
	const gap = 24;
	let offset = margin;

	return (items || this.Fn('list')).map((item) =>
	{
		const placed = { ...item, x: margin, y: offset };

		offset += item.height + gap;

		return placed;
	});
});
