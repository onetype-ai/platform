import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';
import collections from '../../addon.js';

commands.Item({
	id: 'collections:delete',
	exposed: true,
	description: 'Soft delete a collection. Entries stay in their partition and come back if the collection is restored.',
	metadata: { addon: 'collections' },
	in: {
		slug: ['string', null, true]
	},
	out: {
		success: ['boolean']
	},
	callback: async function(properties, resolve)
	{
		const item = await collections.Find().filter('slug', properties.slug).one();

		if(!item)
		{
			return resolve(null, 'Collection ' + properties.slug + ' not found.', 404);
		}

		if(item.Get('system'))
		{
			return resolve(null, 'Collection ' + properties.slug + ' is a system collection and cannot be deleted.', 403);
		}

		await item.Delete();
		onetype.AddonRemove('collections.' + properties.slug, false);

		resolve({ success: true }, 'Collection ' + properties.slug + ' deleted.');
	}
});
