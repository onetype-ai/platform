import packages from '#packages/addon.js';
import assets from '@onetype/framework/assets';

assets.Item({
	type: 'css',
	order: 10000,
	content: () => packages.Fn('assets', 'css')
});
