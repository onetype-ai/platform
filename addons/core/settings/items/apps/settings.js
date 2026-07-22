onetype.AddonReady('ui.apps', (apps) =>
{
    apps.Item({
        id: 'settings',
        name: 'Settings',
        icon: 'settings',
        description: 'Every setting of the platform, grouped by addon and scope.',
        color: 'rgba(160, 163, 170, 1)',
        order: 100,
        position: 'bottom'
    });
});
