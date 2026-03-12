onetype.AddonReady('editor.tabs', () =>
{
    editor.tabs.Item({
        id: 'pages',
        title: 'Pages',
        icon: 'description',
        position: 'left',
        active: true,
        order: 10,
        render: `
            <e-editor-pages-tab></e-editor-pages-tab>
        `
    });
});
