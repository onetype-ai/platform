import commands from '@onetype/framework/commands';
import { resolve as pathResolve, basename } from 'path';
import { readdirSync, readFileSync, existsSync, statSync } from 'fs';

const ROOT = pathResolve(import.meta.dirname, '..', '..', '..', '..', '..', '..', '..', '..', 'elements', 'items');

const scan = () =>
{
	const categories = [];

	if(!existsSync(ROOT))
	{
		return categories;
	}

	for(const folder of readdirSync(ROOT).sort())
	{
		const path = pathResolve(ROOT, folder);

		if(!statSync(path).isDirectory())
		{
			continue;
		}

		const items = [];

		for(const sub of readdirSync(path).sort())
		{
			const dir = pathResolve(path, sub);

			if(!statSync(dir).isDirectory())
			{
				continue;
			}

			const publish = pathResolve(dir, 'publish.json');

			if(!existsSync(publish))
			{
				continue;
			}

			const meta = JSON.parse(readFileSync(publish, 'utf8'));
			const slug = meta.slug || (folder + '-' + sub);
			const js = pathResolve(dir, sub + '.js');
			const css = pathResolve(dir, sub + '.css');

			let config = {};
			let name = slug;
			let icon = 'widgets';
			let description = '';

			if(existsSync(js))
			{
				const source = readFileSync(js, 'utf8');
				const match = source.match(/config\s*:\s*(\{[\s\S]*?\n\t{2}\})/);

				if(match)
				{
					try
					{
						const parsed = new Function('return ' + match[1])();

						config = parsed;
					}
					catch(error) {}
				}

				const nameMatch = source.match(/name\s*:\s*'([^']+)'/);
				const iconMatch = source.match(/icon\s*:\s*'([^']+)'/);
				const descMatch = source.match(/description\s*:\s*'([^']+)'/);

				if(nameMatch) name = nameMatch[1];
				if(iconMatch) icon = iconMatch[1];
				if(descMatch) description = descMatch[1];
			}

			items.push({ slug, name, icon, description, config, path: dir });
		}

		if(items.length)
		{
			categories.push({
				id: folder,
				name: folder.charAt(0).toUpperCase() + folder.slice(1),
				icon: 'folder',
				count: items.length,
				items
			});
		}
	}

	return categories;
};

commands.Item({
	id: 'elements:catalog',
	exposed: true,
	method: 'GET',
	endpoint: '/api/elements/catalog',
	in: {
		category: ['string']
	},
	out: {
		categories: ['array'],
		elements: ['array']
	},
	callback: function(properties, resolve)
	{
		const categories = scan();

		if(properties.category)
		{
			const category = categories.find(c => c.id === properties.category);

			return resolve({
				categories: [],
				elements: category ? category.items.map(({ path, ...item }) => item) : []
			});
		}

		resolve({
			categories: categories.map(({ items, ...cat }) => cat),
			elements: []
		});
	}
});

commands.Item({
	id: 'elements:catalog:source',
	exposed: true,
	method: 'GET',
	endpoint: '/api/elements/catalog/source',
	in: {
		slug: ['string', null, true]
	},
	out: {
		code: ['string'],
		style: ['string'],
		config: ['object']
	},
	callback: function(properties, resolve)
	{
		const categories = scan();
		let found = null;

		for(const category of categories)
		{
			found = category.items.find(i => i.slug === properties.slug);

			if(found)
			{
				break;
			}
		}

		if(!found)
		{
			return resolve(null, 'Element not found.', 404);
		}

		const name = basename(found.path);
		const js = pathResolve(found.path, name + '.js');
		const css = pathResolve(found.path, name + '.css');

		const code = existsSync(js) ? readFileSync(js, 'utf8') : '';
		const style = existsSync(css) ? readFileSync(css, 'utf8') : '';

		resolve({ code, style, config: found.config });
	}
});
