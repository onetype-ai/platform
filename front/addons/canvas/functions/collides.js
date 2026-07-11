ui.canvas.Fn('collides', function(candidate, excludes = [])
{
	const hit = this.Fn('list').find((item) =>
	{
		if(item.id === candidate.id || excludes.includes(item.id))
		{
			return false;
		}

		return candidate.x < item.x + item.width
			&& candidate.x + candidate.width > item.x
			&& candidate.y < item.y + item.height
			&& candidate.y + candidate.height > item.y;
	});

	return hit ? hit.id : null;
});
