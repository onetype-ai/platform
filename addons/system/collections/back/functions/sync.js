import collections from '../addon.js';

collections.Fn('sync', async function(definition)
{
	let item = await collections.Find().filter('slug', definition.slug).one();

	if(!item)
	{
		item = await collections.ItemAdd({ ...definition }).Create();
	}
	else if(definition.system)
	{
		const changed = ['name', 'icon', 'fields', 'search', 'versions'].some((key) => JSON.stringify(item.Get(key)) !== JSON.stringify(definition[key]));

		if(changed)
		{
			item.Set('name', definition.name);
			item.Set('icon', definition.icon);
			item.Set('system', true);
			item.Set('fields', definition.fields);
			item.Set('search', definition.search);
			item.Set('versions', definition.versions);

			await item.Update();
		}
	}

	await collections.Fn('apply', item);

	return item;
});
