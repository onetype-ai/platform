shortcuts.Fn('item.key', function(item)
{
    const entry = config.get('shortcuts.state')[item.Get('id')];

    return entry && entry.key ? entry.key : item.Get('key');
});
