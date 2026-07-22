$ot.modules.settings.Fn('get', function(id, fallback = null, instance = null)
{
    const item = this.ItemGet(id);

    if(!item)
    {
        return fallback;
    }

    const scope = item.Get('scope');
    let value = item.Get('value');

    if(scope)
    {
        const target = instance || this.Fn('scope.active', scope);

        value = target && value && typeof value === 'object' ? value[target] : undefined;
    }

    if(value !== null && value !== undefined)
    {
        return value;
    }

    const preset = item.Get('default');

    return preset === null || preset === undefined ? fallback : preset;
});
