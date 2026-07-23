onetype.AddonReady('ui.explorer', (explorer) =>
{
    platform.settings.ItemOn('add', (item) =>
    {
        if(!item.Get('type'))
        {
            return;
        }

        explorer.Item({
            id: 'setting-' + item.Get('id'),
            order: 40,
            group: 'Settings',
            prefix: 'settings',
            icon: 'settings',
            label: item.Get('label') || item.Get('id'),
            hint: item.Get('description') || '',
            keywords: [item.Get('id')],
            callback: () => $ot.command('settings:open', { group: item.Get('id').split('.')[0] })
        });
    });

    platform.settings.ItemOn('remove', (item) =>
    {
        explorer.ItemRemove('setting-' + item.Get('id'));
    });
});
