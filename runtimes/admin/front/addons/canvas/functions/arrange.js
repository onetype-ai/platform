/* Asks the tidier agent for a grid layout, computes the pixels from
   the slots, falls back to the mesh algorithm when the agent fails. */

ui.canvas.Fn('arrange', async function(items)
{
	const agent = ai.agents.ItemGet('tidier');
	const snap = (value) => Math.ceil(value / 24) * 24;
	const margin = 96;
	const gap = 48;

	try
	{
		const { content } = await agent.Fn('run', {
			items: items.map((item) => ({
				id: item.id,
				name: item.name || item.id,
				group: item.group || null,
				links: item.links.map((link) => link.to),
				width: item.width,
				height: item.height
			}))
		});

		const slots = {};
		const taken = {};

		content.positions.forEach((position) =>
		{
			slots[position.id] = { row: position.row, column: position.column };
			taken[position.row + ':' + position.column] = (taken[position.row + ':' + position.column] || 0) + 1;
		});

		const covered = items.every((item) => item.id in slots);
		const collided = Object.values(taken).some((count) => count > 1);

		if(!covered || collided)
		{
			return { positions: this.Fn('tidy', items), source: 'mesh' };
		}

		/* Slots into pixels: each column is as wide as its widest card,
		   each row as tall as its tallest, plus air in between. */

		const widths = {};
		const heights = {};

		items.forEach((item) =>
		{
			const slot = slots[item.id];

			widths[slot.column] = Math.max(widths[slot.column] || 0, item.width);
			heights[slot.row] = Math.max(heights[slot.row] || 0, item.height);
		});

		const offset = (sizes, index) =>
		{
			let position = margin;

			Object.keys(sizes).map(Number).sort((a, b) => a - b).forEach((place) =>
			{
				if(place < index)
				{
					position += sizes[place] + gap;
				}
			});

			return snap(position);
		};

		const positions = {};

		items.forEach((item) =>
		{
			const slot = slots[item.id];

			positions[item.id] = { x: offset(widths, slot.column), y: offset(heights, slot.row) };
		});

		return { positions, source: 'agent' };
	}
	catch(error)
	{
		return { positions: this.Fn('tidy', items), source: 'mesh' };
	}
});
