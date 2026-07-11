ui.canvas.Fn('near', function(id, direction)
{
	const items = (this.StoreGet('placed') || []).slice().sort((a, b) =>
	{
		return (a.order - b.order) || (a.y - b.y) || (a.x - b.x);
	});

	const index = items.findIndex((item) => item.id === id);

	if(index === -1 || items.length < 2)
	{
		return null;
	}

	return items[(index + direction + items.length) % items.length].id;
});
