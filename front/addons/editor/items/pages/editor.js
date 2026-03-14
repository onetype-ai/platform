pages.Item({
    id: 'editor',
    route: '/editor/:site',
    title: 'Editor - OneType',
    data: async function(parameters)
    {
        const item = await sites.Find().filter('id', parameters.site).one();

        if(!item)
        {
            return $ot.page('/404');
        }

        const pages = await sites.pages.Find().filter('site_id', parameters.site).many();

        for(const page of pages)
        {
            sites.pages.Item(page.data);
        }

        const sections = await sites.sections.Find().filter('site_id', parameters.site).many();

        for(const section of sections)
        {
            sites.sections.Item(section.data);
        }

        $ot.set('site', item.data);
    },
    grid: {
        template: '"toolbar toolbar toolbar" "left content right"',
        columns: 'auto 1fr auto',
        rows: 'auto 1fr',
        gap: '0'
    },
    areas: {
        toolbar: function()
        {
            return `<e-editor-toolbar></e-editor-toolbar>`;
        },
        left: function()
        {
            return `<e-editor-tabs position="left"></e-editor-tabs>`;
        },
        content: function()
        {
            this.loaded = false;

            setTimeout(() => 
            {
                this.loaded = true;
            }, 2500);

            return `
                <e-editor-loader ot-if="!loaded"></e-editor-loader>
                <e-editor-canvas></e-editor-canvas>
            `;
        },
        right: function()
        {
            return `<e-editor-tabs position="right"></e-editor-tabs>`;
        }
    },
    onBeforeLeave: function()
    {
        $ot.set('site', null);

        sites.pages.ItemsClear();
        sites.sections.ItemsClear();
    },
});