shortcuts.FnExpose('rebind', function(id, key)
{
    const item = this.ItemGet(id);

    if(item.Fn('key') === key)
    {
        return false;
    }

    this.Fn('save', id, { key: key === item.Get('key') ? undefined : key });

    onetype.Emit('platform.shortcuts.rebind', { id, key });

    return true;
});
