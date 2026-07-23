onetype.EmitOn('onetype.document.ready', () =>
{
    platform.settings.Fn('do.scope', {
        id: 'user',
        label: 'User',
        icon: 'person',
        options: () => Object.values(platform.users.Items()).map((item) =>
        {
            return { label: item.Get('name'), value: item.Get('id') };
        }),
        active: () => 'dejan'
    });
});
