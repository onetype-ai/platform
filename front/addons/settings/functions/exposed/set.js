platform.settings.FnExpose('set', function(id, value, instance = null)
{
    let item = this.ItemGet(id);

    if(!item)
    {
        item = this.Item({ id });
    }

    const scope = item.Get('scope');

    if(scope)
    {
        const target = instance || this.Fn('get.active', scope);

        if(!target)
        {
            onetype.Error(400, 'Setting :id: is scoped to :scope: and no instance is active.', {id, scope});

            return item;
        }

        const map = { ...(item.Get('value') || {}) };

        map[target] = value;

        item.Set('value', map);
    }
    else
    {
        item.Set('value', value);
    }

    if(item.Get('storage') === 'local')
    {
        this.Fn('do.persist');
    }

    if(item.Get('onChange'))
    {
        item.Get('onChange')(value, item, instance);
    }

    onetype.Emit('platform.settings.change', { id, value, instance });

    return item;
});
