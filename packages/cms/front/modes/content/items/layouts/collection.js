onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'cms-content-collection',
		isActive: true,
		condition: {
			app: ['cms'],
			mode: ['content'],
			callback: function()
			{
				return !!this.cms_collection;
			}
		},
		zone: 'root',
		slot: 'center',
		config: {
			'cms_collection': {
				type: 'string|number',
				value: '',
				description: 'Slug of the collection selected in the sidebar.'
			}
		},
		render: function()
		{
			return `
				<div class="ot-flex-vertical ot-gap-l ot-container-l ot-py-l">
					<e-global-heading :title="cms_collection" element="h2"></e-global-heading>
				</div>
			`;
		}
	});
});
