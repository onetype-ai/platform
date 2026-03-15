pages.Item({
    id: 'site',
    route: ['/site/:id', '/site/:id/:tab'],
    title: function(parameters, data)
    {
        if(!data.site)
        {
            return 'Site Not Found - OneType';
        }

        return data.site.name + ' - OneType';
    },
    data: async function(parameters)
    {
        const item = await sites.Find().filter('id', parameters.id).join('fonts', 'font_ids', 'fonts').one();

        if(!item)
        {
            return $ot.page('/404');
        }

        return {
            site: item.data
        };
    },
    grid: {
        template: '"navbar" "content"',
        columns: '1fr',
        rows: 'auto 1fr',
        gap: '0'
    },
    areas: {
        navbar: function()
        {
            return `<e-navbar></e-navbar>`;
        },
        content: function()
        {
            this.site = this.data.site;
            this.props = ':site="site"';

            this.tabs = [
                { id: 'general', icon: 'settings', label: 'General', href: '/site/' + this.site.id },
                { id: 'domains', icon: 'language', label: 'Domains', href: '/site/' + this.site.id + '/domains' },
                { id: 'customization', icon: 'palette', label: 'Customization', href: '/site/' + this.site.id + '/customization' }
            ];

            this.tab = () =>
            {
                switch(this.parameters.tab)
                {
                    case 'domains':
                        return '<e-site-tab-domains ' + this.props + '></e-site-tab-domains>';
                    case 'customization':
                        return '<e-site-tab-colors ' + this.props + '></e-site-tab-colors>'
                            + '<e-site-tab-fonts ' + this.props + '></e-site-tab-fonts>'
                            + '<e-site-tab-media ' + this.props + '></e-site-tab-media>';
                    default:
                        return '<e-site-tab-basic ' + this.props + '></e-site-tab-basic>'
                            + '<e-site-tab-danger ' + this.props + '></e-site-tab-danger>';
                }
            };

            return `
                <div class="ot-container-m ot-flex ot-flex-col ot-gap-l ot-py-l">
                    <e-global-heading :variant="['left', 'size-m', 'clean']" :title="site.name" description="Site settings and configuration.">
                        <div slot="right">
                            <e-form-button text="Open Editor" icon="edit" :variant="['brand', 'size-m']" :href="'/editor/' + site.id"></e-form-button>
                        </div>
                    </e-global-heading>
                    <e-navigation-tabs :items="tabs" :active="parameters.tab || 'general'"></e-navigation-tabs>
                    ${this.tab()}
                </div>
            `;
        }
    }
});
