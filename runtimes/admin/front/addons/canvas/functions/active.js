ui.canvas.Fn('active', function()
{
	const match = Object.values(this.Items()).sort((a, b) => a.Get('order') - b.Get('order')).find((item) =>
	{
		return item.Fn('visible');
	});

	if(!match)
	{
		return null;
	}

	return {
		id: match.Get('id'),
		data: match.Get('data')
	};
});
