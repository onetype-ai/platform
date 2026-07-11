import onetype from '@onetype/framework';
import collections from '../addon.js';

collections.Fn('get', function(slug)
{
	return onetype.AddonGet('collections.' + slug);
});
