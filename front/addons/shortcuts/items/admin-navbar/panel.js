onetype.AddonReady('admin.navbar', (navbar) =>
{
    navbar.Item({
        id: 'panel',
        order: 6,
        position: 'right',
        popup: {
            title: 'Shortcuts',
            description: 'Enable or disable editor shortcuts.',
            width: 'l',
            render: () => '<e-platform-shortcuts-panel></e-platform-shortcuts-panel>'
        },
        icon: 'keyboard',
        tooltip: 'Shortcuts'
    });
});
