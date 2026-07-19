ui.canvas.Fn('edges', function(items)
{
	const list = items || this.Fn('list');
	const index = {};

	list.forEach((item) =>
	{
		index[item.id] = item;
	});

	const edges = [];

	list.forEach((item) =>
	{
		(item.links || []).forEach((link) =>
		{
			const target = index[link.to];

			if(!target)
			{
				return;
			}

			const source = { x: item.x + item.width / 2, y: item.y + item.height / 2 };
			const sink = { x: target.x + target.width / 2, y: target.y + target.height / 2 };
			const vertical = Math.abs(sink.y - source.y) >= Math.abs(sink.x - source.x);

			let out;
			let into;
			let tangent;

			if(vertical)
			{
				const down = sink.y >= source.y;

				out = { x: source.x, y: down ? item.y + item.height : item.y };
				into = { x: sink.x, y: down ? target.y : target.y + target.height };
				tangent = { x: 0, y: down ? 1 : -1 };
			}
			else
			{
				const right = sink.x >= source.x;

				out = { x: right ? item.x + item.width : item.x, y: source.y };
				into = { x: right ? target.x : target.x + target.width, y: sink.y };
				tangent = { x: right ? 1 : -1, y: 0 };
			}

			const reach = Math.max(40, Math.min(120, Math.hypot(into.x - out.x, into.y - out.y) / 2));

			edges.push({
				id: item.id + ':' + link.to,
				from: item.id,
				to: link.to,
				label: link.label || '',
				color: link.color || '',
				middle: { x: (out.x + into.x) / 2, y: (out.y + into.y) / 2 },
				path: 'M ' + out.x + ' ' + out.y
					+ ' C ' + (out.x + tangent.x * reach) + ' ' + (out.y + tangent.y * reach)
					+ ', ' + (into.x - tangent.x * reach) + ' ' + (into.y - tangent.y * reach)
					+ ', ' + into.x + ' ' + into.y
			});
		});
	});

	return edges;
});
