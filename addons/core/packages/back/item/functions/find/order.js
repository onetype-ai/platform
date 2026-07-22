import packages from '#packages/addon.js';

packages.Fn('item.find.order', function(item)
{
    this.methods.find = (slug) =>
    {
        return Object.values(this.Items()).find((candidate) => candidate.Get('slug') === slug);
    };

    this.methods.depth = (candidate, seen) =>
    {
        seen.add(candidate.Get('slug'));

        let deepest = 0;

        for(const slug of candidate.Get('depends').concat(candidate.Get('bundle')))
        {
            const dependency = this.methods.find(slug);

            if(!dependency || seen.has(slug))
            {
                continue;
            }

            deepest = Math.max(deepest, this.methods.depth(dependency, seen));
        }

        return deepest + 1;
    };

    return this.methods.depth(item, new Set());
});
