shortcuts.ItemOn('removed', (item) =>
{
    admin.explorer.ItemRemove('shortcut-' + item.Get('id'));
});
