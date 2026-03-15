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
                <e-sites-pages-list ot-if="view === 'list'" :_settings="settings"></e-sites-pages-list>
                <e-sites-pages-settings ot-if="view === 'settings'" :page="page" :_back="back"></e-sites-pages-settings>
            `;
        }
    });
});
