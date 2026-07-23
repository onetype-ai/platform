platform.shortcuts.ItemOn('added', (item) =>
{
    onetype.AddonReady('admin.explorer', (explorer) =>
    {
        explorer.Item({
            id: 'shortcut-' + item.Get('id'),
            order: 60,
            group: 'Shortcuts',
            prefix: 'shortcuts',
            icon: 'keyboard',
            label: item.Get('name') || item.Get('id'),
            hint: item.Fn('hint'),
            keywords: [item.Get('id')],
            condition: { callback: () => item.Fn('enabled') },
            callback: () => commands.Fn('run', 'shortcuts:trigger', { id: item.Get('id') })
        });
    });
});
