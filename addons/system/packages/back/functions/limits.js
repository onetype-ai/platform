import packages from '#packages/addon.js';
import config from '#config/addon.js';

packages.Fn('limits', function(slug)
{
	const item = Object.values(this.Items()).find((candidate) => candidate.Get('slug') === slug);
	const overrides = config.Fn('get', 'limits') || {};

	return { ...(item ? item.Get('limits') : {}), ...(overrides[slug] || {}) };
});
