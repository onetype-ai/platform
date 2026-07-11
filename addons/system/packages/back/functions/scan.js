import packages from '#packages/addon.js';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';

packages.Fn('scan', function()
{
	const directory = resolve(import.meta.dirname, '..', '..', '..', '..', '..', 'packages');

	if(!existsSync(directory))
	{
		return this.Items();
	}

	for(const entry of readdirSync(directory, { withFileTypes: true }))
	{
		const file = join(directory, entry.name, 'onetype.json');

		if(!entry.isDirectory() || !existsSync(file))
		{
			continue;
		}

		const manifest = JSON.parse(readFileSync(file, 'utf8'));

		this.Item({ ...manifest, path: join(directory, entry.name) });
	}

	return this.Items();
});
