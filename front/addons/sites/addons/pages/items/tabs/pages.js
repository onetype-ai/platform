onetype.AddonReady('editor.tabs', () =>
{
    editor.tabs.Item({
        id: 'pages',
        title: 'Pages',
        icon: 'description',
        position: 'left',
        active: true,
        order: 10,
        render: function() 
        {
            this.view = 'list';
            this.page = null;

            this.settings = (page) =>
            {
                this.page = page;
                this.view = 'settings';
            };

            this.back = () =>
            {
                this.view = 'list';
            };

            return `
                <e-editor-pages-list ot-if="view === 'list'" :_settings="settings"></e-editor-pages-list>
                <e-editor-pages-settings ot-if="view === 'settings'" :page="page" :_back="back"></e-editor-pages-settings>
            `;
        }
    });
});
