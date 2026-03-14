elements.ItemAdd({
	id: 'editor-pages-settings',
	icon: 'settings',
	name: 'Editor Pages Settings',
	description: 'Settings panel for the active page.',
	category: 'Editor',
	author: 'OneType',
	config: {
		page: ['object'],
		_back: ['function'],
	},
	render: function()
	{
		this.fields = {};

		this.sections = [
			{
				fields: [
					{
						key: 'title',
						label: 'Title',
						position: 'top',
						element: 'form-input',
						properties: { placeholder: 'Page title', variant: ['bg-3', 'border', 'size-s'] }
					},
					{
						key: 'route',
						label: 'Route',
						position: 'top',
						element: 'form-input',
						properties: { icon: 'link', placeholder: '/route', variant: ['bg-3', 'border', 'size-s'] }
					},
					{
						key: 'is_home',
						label: 'Home Page',
						description: 'Loads when visitors open your site.',
						position: 'left',
						element: 'form-toggle',
						properties: { variant: ['bg-3', 'size-s'] }
					},
					{
						key: 'is_404',
						label: '404 Page',
						description: 'Shows when a URL is not found.',
						position: 'left',
						element: 'form-toggle',
						properties: { variant: ['bg-3', 'size-s'] }
					}
				]
			},
			{
				title: 'SEO',
				collapsed: true,
				fields: [
					{
						key: 'seo_title',
						label: 'Title',
						position: 'top',
						element: 'form-input',
						properties: { placeholder: 'Page title for search engines', variant: ['bg-3', 'border', 'size-s'] }
					},
					{
						key: 'seo_description',
						label: 'Description',
						position: 'top',
						element: 'form-textarea',
						properties: { rows: 3, placeholder: 'Brief description for search results', variant: ['bg-3', 'border', 'size-s'] }
					},
					{
						key: 'seo_tags',
						label: 'Tags',
						position: 'top',
						element: 'form-tags',
						properties: { placeholder: 'Add keyword...', variant: ['bg-3', 'border', 'size-s'] }
					}
				]
			},
			{
				title: 'Custom Code',
				collapsed: true,
				fields: [
					{
						key: 'code_head',
						label: 'Head',
						description: 'Injected before </head>',
						position: 'top',
						element: 'form-textarea',
						properties: { rows: 4, placeholder: '<script>, <link>, <meta>...', variant: ['bg-3', 'border', 'size-s'] }
					},
					{
						key: 'code_body',
						label: 'Body',
						description: 'Injected before </body>',
						position: 'top',
						element: 'form-textarea',
						properties: { rows: 4, placeholder: '<script>, tracking, etc.', variant: ['bg-3', 'border', 'size-s'] }
					}
				]
			}
		];

		this.change = ({ key, value }) =>
		{
			this.fields[key] = value;
		};

		this.save = async () =>
		{
			if (!this.page || !Object.keys(this.fields).length)
			{
				this._back && this._back();
				return;
			}

			await sites.pages.Fn('update', this.page.id, this.fields);

			this.fields = {};
			this._back && this._back();
		};

		this.confirm = false;

		this.remove = async () =>
		{
			if (!this.confirm)
			{
				this.confirm = true;
				return;
			}

			await sites.pages.Fn('delete', this.page.id);
			this._back && this._back();
		};

		return `
			<div class="holder" ot-if="page">
				<e-core-builder :sections="sections" :values="page" :_change="change"></e-core-builder>
				<div class="actions">
					<e-form-button text="Save" icon="check" :variant="['brand', 'size-s', 'full']" :_click="save"></e-form-button>
					<e-form-button :text="confirm ? 'Click again to confirm' : 'Delete'" icon="delete" :variant="['soft-red', 'size-s', 'full']" :_click="remove"></e-form-button>
				</div>
			</div>
		`;
	}
});
