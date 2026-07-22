shortcuts.FnExpose('list', function(query)
{
    const groups = {};

    query = query ? query.toLowerCase() : '';

    for(const item of Object.values(this.Items()))
    {
        const entry = {
            id: item.Get('id'),
            name: item.Get('name') || item.Get('id'),
            description: item.Get('description'),
            key: this.Fn('format', item.Fn('key')),
            custom: item.Fn('key') !== item.Get('key'),
            enabled: item.Fn('enabled')
        };

        if(query && !(entry.name + ' ' + (entry.description || '') + ' ' + entry.key).toLowerCase().includes(query))
        {
            continue;
        }

        const group = item.Get('group') || 'Other';

        groups[group] = groups[group] || [];
        groups[group].push(entry);
    }

    return Object.keys(groups).sort().map((name) =>
    {
        return { name, shortcuts: groups[name].sort((a, b) => a.name.localeCompare(b.name)) };
    });
});
