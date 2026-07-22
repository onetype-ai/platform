$ot.modules.settings.Fn('scoped', function(selection = {}, query = '')
{
    return Object.values(this.Fn('scopes')).map((scope) =>
    {
        const selected = selection[scope.id] || null;
        const items = [];

        if(selected)
        {
            Object.values(this.Items()).forEach((item) =>
            {
                if(item.Get('scope') !== scope.id || !item.Get('type'))
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

                items.push({
                    id: item.Get('id'),
                    label: item.Get('label') || item.Get('id'),
                    type: item.Get('type'),
                    description: item.Get('description') || '',
                    value: this.Fn('get', item.Get('id'), null, selected),
                    options: item.Get('options'),
                    columns: item.Get('columns'),
                    rows: item.Get('type') === 'table' ? (typeof item.Get('options') === 'function' ? item.Get('options')() : item.Get('options')) : [],
                    instance: selected
                });
            });
        }

        return {
            id: scope.id,
            label: scope.label,
            icon: scope.icon || 'category',
            instances: (typeof scope.options === 'function' ? scope.options() : scope.options) || [],
            selected,
            items
        };
    });
});
