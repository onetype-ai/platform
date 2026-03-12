elements.ItemAdd({
	id: 'editor-pages-settings',
	icon: 'settings',
	name: 'Editor Pages Settings',
	description: 'Settings panel for the active page.',
	category: 'Editor',
	author: 'OneType',
	config: {
		page: ['object'],
		_save: ['function'],
	},
	render: function()
	{
		this.change = (key, event, data) =>
		{
			this.page[key] = data.value;
		};

		return `
			<div class="holder" ot-if="page">
				<div class="group">
					<div class="field">
						<span class="label">Title</span>
						<e-form-input :value="page.title" :variant="['bg-2', 'border', 'size-s']" :_change="(event, data) => change('title', event, data)"></e-form-input>
					</div>
					<div class="field">
						<span class="label">Slug</span>
						<e-form-input :value="page.slug" :variant="['bg-2', 'border', 'size-s']" :_change="(event, data) => change('slug', event, data)"></e-form-input>
					</div>
				</div>
				<div class="actions">
					<e-form-button text="Save & Return" icon="save" :variant="['brand', 'size-s', 'full']" :_click="_save"></e-form-button>
				</div>
			</div>
		`;
	}
});
