import packages from './addon.js';

/* Schemas */
import './core/schemas/manifest.js';
import './core/schemas/package.js';

/* Functions */
import './functions/sync.js';
import './functions/load.js';

/* Item */
import './item/functions/find/order.js';
import './item/functions/load/back.js';
import './item/functions/load/front.js';
import './item/functions/enable.js';
import './item/functions/disable.js';

/* Items */
import './items/config/packages.js';

/* Listeners */
import './listeners/boot.js';
import './listeners/http.js';

$ot.platform.packages = {
	limits: (slug) =>
	{
		const item = Object.values(packages.Items()).find((item) => item.Get('slug') === slug);

		return item ? item.Get('limits') : {};
	},
	get: {
		one: (slug) =>
		{
			return Object.values(packages.Items()).find((item) => item.Get('slug') === slug);
		},
		many: () =>
		{
			return Object.values(packages.Items());
		}
	}
};

export default packages;
