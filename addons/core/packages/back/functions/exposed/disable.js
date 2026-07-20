import onetype from '@onetype/framework';
import packages from '#packages/addon.js';

packages.FnExpose('disable', function(slug)
{
	const item = this.one(slug);

	if(!item)
	{
		return false;
	}

	if(item.Fn('is.dependant').length)
	{
		return false;
	}

	item.Fn('disable');

	onetype.Emit('platform.packages.disable', { slug: item.Get('slug') });

	return true;
});
