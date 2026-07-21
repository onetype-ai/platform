import packages from '#packages/addon.js';

packages.FnExpose('enable', function(slug)
{
	const item = this.one(slug);

	if(!item)
	{
		return false;
	}

	item.Fn('enable');

	const blocked = item.Fn('is.blocked');

	if(blocked)
	{
		item.Set('status', 'blocked');
	}

	item.Set('message', blocked ? blocked : '');

	onetype.Emit('platform.packages.enable', { slug: item.Get('slug') });

	return true;
});
