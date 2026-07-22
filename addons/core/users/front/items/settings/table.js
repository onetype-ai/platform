onetype.AddonReady('modules.settings', (settings) =>
{
    settings.Item({
        id: 'workspace.users.list',
        label: 'Users',
        type: 'table',
        columns: [
            { id: 'id', label: 'ID', type: 'tag', width: '120px' },
            { id: 'name', label: 'Name', type: 'text', width: '1fr' },
            { id: 'email', label: 'Email', type: 'text', width: '2fr' }
        ],
        options: () => Object.values($ot.workspace.users.Items()).map((item) =>
        {
            return {
                id: item.Get('id'),
                name: item.Get('name'),
                email: item.Get('email')
            };
        }),
        storage: 'custom',
        metadata: { addon: 'workspace.users' },
        description: 'Everyone with access to this site.'
    });
});
