shortcuts.Fn('item.hint', function(item)
{
    return this.Fn('format', item.Fn('key')) + (item.Get('description') ? ' — ' + item.Get('description') : '');
});
