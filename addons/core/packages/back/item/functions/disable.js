import config from '#config/addon.js';
import packages from '#packages/addon.js';

packages.Fn('item.disable', function(item)
{
	item.Set('status', 'disabled');

	const instance = Object.values(config.Items()).find((candidate) => candidate.Get('key') === 'packages');
	const others = instance.Get('value').filter((entry) => entry.slug !== item.Get('slug'));

	instance.Set('value', [...others, {
		slug: item.Get('slug'),
		status: 'disabled',
		version: item.Get('version')
	}]);
});
