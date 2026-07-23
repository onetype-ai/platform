onetype.AddonReady('ui.layouts', (layouts) =>
{
    layouts.Item({
        id: 'platform.settings.content',
        isActive: true,
        condition: { app: ['settings'] },
        zone: 'root',
        slot: 'center',
        render: function()
        {
            return /* html */ `<e-platform-settings-content :group="group" :scope="scope"></e-platform-settings-content>`;
        }
    });
});
