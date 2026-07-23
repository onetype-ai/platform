onetype.EmitOn('platform.boot', () =>
{
    for(const item of Object.values(platform.shortcuts.Items()))
    {
        const entry = admin.explorer.ItemGet('shortcut-' + item.Get('id'));

        if(entry)
        {
            entry.Set('hint', item.Fn('hint'));
        }
    }
});
