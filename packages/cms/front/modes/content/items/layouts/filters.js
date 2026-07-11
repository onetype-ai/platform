onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'cms-content-filters',
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
		slot: 'left',
		config: {
			'cms_collection': {
				type: 'string|number',
				value: '',
				description: 'Slug of the collection selected in the sidebar.'
			},
			'cms_content_filters': {
				type: 'object',
				value: {},
				description: 'Filter state of the collection listing keyed by group id.'
			}
		},
		render: function()
		{
			this.back = () =>
			{
				$ot.ui.layouts.data({ cms_collection: '' });
			};

			this.change = ({ value }) =>
			{
				$ot.ui.layouts.data({ cms_content_filters: value });
			};

			return `
				<div class="ot-flex-vertical ot-gap-m ot-p-m">
					<e-form-button icon="arrow_back" label="All collections" tone="soft" :stretch="true" :_click="back"></e-form-button>
					<div class="ot-flex-1 ot-scrollbar">
						<e-data-filters :value="cms_content_filters" :_change="change"></e-data-filters>
					</div>
				</div>
			`;
		}
	});
});
