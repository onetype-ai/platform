import onetype from '@onetype/framework';
import collections from '#shared/system/collections/addon.js';

/* Resolve a collection's live runtime addon by slug for a team: load its definition
   from the catalog, materialize it, and return the addon (or null if not found). */

collections.Fn('addon', async function(slug, team_id, connection = 'primary')
{
	const definition = await collections.Find({ connection })
		.filter('slug', slug)
		.filter('team_id', team_id)
		.filter('deleted_at', null, 'NULL')
		.one();

	if(!definition)
	{
		return null;
	}

	return collections.Fn('materialize', definition.GetData());
});
