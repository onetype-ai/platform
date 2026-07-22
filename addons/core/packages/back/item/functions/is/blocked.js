import packages from '#packages/addon.js';

packages.Fn('item.is.blocked', function(item, seen = new Set())
{
    seen.add(item.Get('slug'));

    for(const slug of item.Get('depends').concat(item.Get('bundle')))
    {
        if(seen.has(slug))
        {
            continue;
        }

        const dependency = this.one(slug);

        if(!dependency)
        {
            return 'Requires package ' + slug + ' which is not installed.';
        }

        if(dependency.Get('status') === 'disabled')
        {
            return 'Requires package ' + slug + ' which is disabled.';
        }

        const blocked = dependency.Fn('is.blocked', seen);

        if(blocked)
        {
            return 'Requires package ' + slug + ' which is not loaded. ' + blocked;
        }
    }

    return null;
});
