import packages from './addon.js';

/* Schemas */
import './core/schemas/package.js';

/* Functions */
import './functions/directories.js';
import './functions/scan.js';
import './functions/order.js';
import './functions/back.js';
import './functions/limits.js';
import './functions/list.js';
import './functions/assets.js';

/* Items */
import './items/assets/js.js';
import './items/assets/css.js';

/* Listeners */
import './listeners/boot.js';
import './listeners/http.js';

$ot.platform.packages = {
	limits: (slug) =>
	{
		return packages.Fn('limits', slug);
	},
	get: {
		one: (slug) =>
		{
			return Object.values(packages.Items()).find((candidate) => candidate.Get('slug') === slug) || null;
		},
		many: () =>
		{
			return Object.values(packages.Items());
		}
	}
};

export default packages;
