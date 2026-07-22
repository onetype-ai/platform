import config from '#config/addon.js';
import packages from '#packages/addon.js';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';

packages.Fn('sync', function()
{
    this.methods.directories = () =>
    {
        const list = [process.cwd()];

        for(const root of [resolve(process.cwd(), 'packages'), resolve(process.cwd(), 'node_modules')].filter(existsSync))
        {
            for(const entry of readdirSync(root))
            {
                list.push(...(entry.startsWith('@') ? readdirSync(join(root, entry)).map((scoped) => join(root, entry, scoped)) : [join(root, entry)]));
            }
        }

        return list;
    };

    this.methods.instance = (slug) =>
    {
        return config.one('packages').Get('value').find((entry) => entry.slug === slug);
    };

    this.methods.exists = (slug) =>
    {
        return Object.values(this.Items()).some((item) => item.Get('slug') === slug);
    };

    for(const directory of this.methods.directories())
    {
        const file = join(directory, 'onetype.json');

        if(!existsSync(file))
        {
            continue;
        }

        const manifest = onetype.DataDefine(JSON.parse(readFileSync(file, 'utf8')), 'platform.package.manifest', true);

        if(this.methods.exists(manifest.slug))
        {
            continue;
        }

        const entry = this.methods.instance(manifest.slug);

        if(entry)
        {
            manifest.status = entry.status;
        }

        this.Item({ ...manifest, path: directory });
    }

    return this.Items();
});
