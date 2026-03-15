pages.Item({
    id: 'editor',
    route: '/editor/:site',
    title: 'Editor - OneType',
    data: async function(parameters)
    {
        const [item, page_items, section_items, element_items] = await Promise.all([
            sites.Find().filter('id', parameters.site).one(),
            sites.pages.Find().filter('site_id', parameters.site).many(),
            sites.sections.Find().filter('site_id', parameters.site).many(),
            sites.elements.Find().filter('site_id', parameters.site).many()
        ]);

        if(!item)
        {
            return $ot.page('/404');
        }

        for(const page of page_items)
        {
            sites.pages.Item(page.data);
        }

        for(const section of section_items)
        {
            sites.sections.Item(section.data);
        }

        for(const element of element_items)
        {
            sites.elements.Item(element.data);
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
            }, 0);

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
        sites.elements.ItemsClear();
    },
});