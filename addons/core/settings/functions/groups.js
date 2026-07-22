$ot.modules.settings.Fn('groups', function(query = '')
{
    const groups = {};

    Object.values(this.Items()).forEach((item) =>
    {
        if(!item.Get('type') || item.Get('scope'))
        {
            return;
        }

        if(query)
        {
            const haystack = (item.Get('id') + ' ' + (item.Get('label') || '') + ' ' + (item.Get('description') || '')).toLowerCase();

            if(!haystack.includes(query))
            {
                return;
            }
        }

        const addon = (item.Get('metadata') || {}).addon || 'other';

        if(!groups[addon])
        {
            const entry = Object.values(documentation.Items()).find((doc) => doc.Get('addon') === addon);

            groups[addon] = {
                id: addon,
                icon: entry ? entry.Get('icon') : 'extension',
                label: entry ? entry.Get('label') : addon.charAt(0).toUpperCase() + addon.slice(1),
                items: []
            };
        }

        groups[addon].items.push({
            id: item.Get('id'),
            label: item.Get('label') || item.Get('id'),
            type: item.Get('type'),
            description: item.Get('description') || '',
            value: this.Fn('get', item.Get('id')),
            options: item.Get('options'),
            columns: item.Get('columns'),
            rows: item.Get('type') === 'table' ? (typeof item.Get('options') === 'function' ? item.Get('options')() : item.Get('options')) : []
        });
    });

    return Object.values(groups);
});
