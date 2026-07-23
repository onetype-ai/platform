onetype.AddonReady('admin.navbar', (navbar) =>
{
    navbar.Item({
        id: 'avatars',
        order: 10,
        position: 'right',
        render: () => '<e-platform-collaborators-avatars></e-platform-collaborators-avatars>'
    });
});
