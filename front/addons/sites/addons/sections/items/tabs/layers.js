onetype.AddonReady('editor.tabs', () =>
{
    editor.tabs.Item({
        title: 'Layers',
        icon: 'layers',
        position: 'left',
        order: 20,
        render: function() 
        {
            return `
                <e-editor-sections-list></e-editor-sections-list>
            `;
        }
    });
});