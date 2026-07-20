import packages from '#packages/addon.js';

packages.Fn('item.is.dependant', function(item)
{
	return Object.values(this.Items())
		.filter((candidate) => candidate.Get('status') !== 'disabled')
		.filter((candidate) => candidate.Get('depends').includes(item.Get('slug')))
		.map((candidate) => candidate.Get('slug'));
});
