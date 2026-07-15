import packages from '#packages/addon.js';

packages.Fn('order', function()
{
	const items = Object.values(this.Items());
	const bySlug = {};

	for(const item of items)
	{
		bySlug[item.Get('slug')] = item;
	}

	const sorted = [];
	const seen = new Set();

	const visit = (item) =>
	{
		if(seen.has(item.Get('slug')))
		{
			return;
		}

		seen.add(item.Get('slug'));

		for(const slug of item.Get('depends'))
		{
			if(bySlug[slug])
			{
				visit(bySlug[slug]);
			}
		}

		sorted.push(item);
	};

	for(const item of items)
	{
		visit(item);
	}

	return sorted;
});
