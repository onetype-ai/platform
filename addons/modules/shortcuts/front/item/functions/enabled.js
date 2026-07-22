shortcuts.Fn('item.enabled', function(item)
{
    const entry = config.get('shortcuts.state')[item.Get('id')];

    return entry && 'enabled' in entry ? entry.enabled : item.Get('enabled');
});
