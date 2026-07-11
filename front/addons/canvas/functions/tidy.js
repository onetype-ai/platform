ui.canvas.Fn('tidy', function(items)
{
	const cell = 24;
	const gap = 24;
	const margin = 96;
	const spread = 72;
	const wrap = 1440;

	const snap = (value) => Math.ceil(value / cell) * cell;

	/* Groups stay together as one block, loose items are blocks of one,
	   reading order is preserved through the (order, y, x) sort. */

	const sorted = items.slice().sort((a, b) => (a.order - b.order) || (a.y - b.y) || (a.x - b.x));
	const clusters = [];
	const index = {};

	sorted.forEach((item) =>
	{
		if(item.group)
		{
			if(!(item.group in index))
			{
				index[item.group] = clusters.length;
				clusters.push([]);
			}

			clusters[index[item.group]].push(item);
		}
		else
		{
			clusters.push([item]);
		}
	});

	const blocks = clusters.map((members) =>
	{
		const columns = Math.ceil(Math.sqrt(members.length));
		const wide = snap(Math.max(...members.map((member) => member.width)) + gap);
		const tall = snap(Math.max(...members.map((member) => member.height)) + gap);
		const rows = Math.ceil(members.length / columns);

		return { members, columns, wide, tall, width: columns * wide - gap, height: rows * tall - gap };
	});

	const positions = {};
	let x = margin;
	let y = margin;
	let row = 0;

	blocks.forEach((block) =>
	{
		if(x > margin && x + block.width > margin + wrap)
		{
			x = margin;
			y = snap(y + row + spread);
			row = 0;
		}

		block.members.forEach((member, place) =>
		{
			positions[member.id] = {
				x: x + (place % block.columns) * block.wide,
				y: y + Math.floor(place / block.columns) * block.tall
			};
		});

		x = snap(x + block.width + spread);
		row = Math.max(row, block.height);
	});

	return positions;
});
