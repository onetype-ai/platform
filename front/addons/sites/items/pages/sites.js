pages.Item({
    id: 'sites',
    route: '/',
    title: 'Sites - OneType',
    grid: {
        template: '"navbar" "content"',
        columns: '1fr',
        rows: 'auto 1fr',
        gap: '0'
    },
    data: async function()
    {
        const items = await sites.Find().join('categories', 'category_id', 'category').join('fonts', 'font_ids', 'fonts').join('extensions', 'extension_ids', 'extensions').sort('updated_at', 'desc').many();

        return {
            sites: items.map(item => item.data)
        };
    },
    areas: {
        navbar: function()
        {
            return `<e-navbar></e-navbar>`;
        },
        content: function()
        {
            this.items = this.data.sites;
            this.logged = !!this.state.user;

            this.submit = (form) =>
            {
                console.log('Create site:', form);
            };

            return `
                <e-sites-survey ot-if="!logged" :_submit="submit"></e-sites-survey>
                <div ot-if="logged" class="ot-container-m ot-flex ot-flex-col ot-gap-l ot-py-l">
                    <e-global-heading :variant="['left', 'size-m', 'clean']" title="Sites" description="Browse and manage your sites, themes, and custom domains.">
                        <div slot="right">
                            <e-form-button text="New Site" icon="add" :variant="['brand', 'size-m']" href="/create"></e-form-button>
                        </div>
                    </e-global-heading>
                    <e-status-empty ot-if="!items.length" icon="language" title="No sites yet" description="Create your first site to get started."></e-status-empty>
                    <div ot-if="items.length" class="ot-grid-auto-l">
                        <e-sites-card ot-for="item in items" :site="item"></e-sites-card>
                    </div>
                </div>
            `;
        }
    }
});