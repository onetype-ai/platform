import onetype from '@onetype/framework';
import collections from '../../addon.js';

onetype.EmitOn('@addon.init', (addon) =>
{
	addon.Collection = function(slug, callback)
	{
		if(callback === undefined)
		{
			return collections.Fn('get', slug);
		}

		return collections.Fn('declare', slug, callback);
	};
});
