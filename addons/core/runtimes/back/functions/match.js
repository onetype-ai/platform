import runtimes from '#runtimes/addon.js';

runtimes.Fn('match', function(hostname, pathname)
{
	let matched = null;
	let score = -1;

	for(const item of Object.values(runtimes.Items()))
	{
		const domain = item.Get('domain');
		const path = item.Get('path');

		if(!domain)
		{
			continue;
		}

		if(domain !== '*' && domain !== hostname)
		{
			continue;
		}

		if(!onetype.RouteMatch(path === '/' ? '/*' : path + '/*', pathname).match)
		{
			continue;
		}

		const specificity = (domain !== '*' ? 1000 : 0) + path.length;

		if(specificity > score)
		{
			matched = item;
			score = specificity;
		}
	}

	return matched;
});
