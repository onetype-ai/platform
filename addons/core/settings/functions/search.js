$ot.modules.settings.Fn('search', function(query)
{
    const results = [];

    Object.values(this.Items()).forEach((item) =>
    {
        if(!item.Get('type'))
        {
            return;
        }

        const haystack = (item.Get('id') + ' ' + (item.Get('label') || '') + ' ' + (item.Get('description') || '')).toLowerCase();

        if(!haystack.includes(query))
        {
            return;
        }

        const scope = item.Get('scope');
        const addon = (item.Get('metadata') || {}).addon || 'other';
        const entry = Object.values(documentation.Items()).find((doc) => doc.Get('addon') === addon);
        const instance = scope ? this.Fn('scope.active', scope) : null;

        if(scope && !instance)
        {
            return;
        }

        results.push({
            id: item.Get('id'),
            label: item.Get('label') || item.Get('id'),
            type: item.Get('type'),
            description: item.Get('description') || '',
            value: this.Fn('get', item.Get('id'), null, instance),
            options: item.Get('options'),
            columns: item.Get('columns'),
            rows: item.Get('type') === 'table' ? (typeof item.Get('options') === 'function' ? item.Get('options')() : item.Get('options')) : [],
            instance,
            badge: scope ? (this.Fn('scopes')[scope] || {}).label || scope : (entry ? entry.Get('label') : addon)
        });
    });

    return results;
});
