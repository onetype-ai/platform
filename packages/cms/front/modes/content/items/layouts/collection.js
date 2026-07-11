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
			},
			'cms_content_view': {
				type: 'string',
				value: 'table',
				options: ['table', 'grid', 'cards', 'list', 'board', 'calendar', 'gallery', 'timeline', 'tree', 'map'],
				description: 'Active listing view of the collection.'
			}
		},
		render: function()
		{
			this.views = [
				{ id: 'table', icon: 'table' },
				{ id: 'grid', icon: 'grid_on' },
				{ id: 'cards', icon: 'cards' },
				{ id: 'list', icon: 'list' },
				{ id: 'board', icon: 'view_kanban' },
				{ id: 'calendar', icon: 'calendar_month' },
				{ id: 'gallery', icon: 'photo_library' },
				{ id: 'timeline', icon: 'timeline' },
				{ id: 'tree', icon: 'account_tree' },
				{ id: 'map', icon: 'map' }
			];

			this.pick = ({ value }) =>
			{
				$ot.ui.layouts.data({ cms_content_view: value });
			};

			this.stage = () =>
			{
				return elements.Render('views-' + this.cms_content_view, {}).Element;
			};

			return `
				<div class="ot-flex-vertical ot-gap-m ot-p-m">
					<div class="ot-flex-end">
						<e-navigation-tabs tone="contained" :items="views" :active="cms_content_view" :_change="pick"></e-navigation-tabs>
					</div>
					<div class="ot-flex-1 ot-scrollbar">
						<div ot-node="stage()" :ot-key="cms_content_view"></div>
					</div>
				</div>
			`;
		}
	});
});
