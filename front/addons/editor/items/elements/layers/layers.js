elements.ItemAdd({
	id: 'editor-layers',
	icon: 'layers',
	name: 'Editor Layers',
	description: 'Tree view panel showing section and element hierarchy.',
	category: 'Editor',
	author: 'OneType',
	config: {
		sections: {
			type: 'array',
			value: []
		},
		selected: {
			type: 'string',
			value: ''
		},
		active: {
			type: 'string',
			value: ''
		},
		_section: {
			type: 'function'
		},
		_element: {
			type: 'function'
		}
	},
	render: function()
	{
		this.icon = (type) =>
		{
			const category = type.split('-')[0];
			const icons = {
				hero: 'star',
				features: 'grid_view',
				cta: 'ads_click',
				faq: 'help',
				pricing: 'payments',
				testimonials: 'format_quote',
				cards: 'dashboard',
				footer: 'call_to_action',
				navigation: 'menu',
				stats: 'bar_chart',
				logos: 'branding_watermark',
				contact: 'mail',
				team: 'group',
				gallery: 'photo_library',
				blog: 'article',
				forms: 'edit_note',
				process: 'route'
			};

			return icons[category] || 'widgets';
		};

		this.label = (element) =>
		{
			return element.type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
		};

		this.cols = (section) =>
		{
			return section.columns || [];
		};

		this.items = (column) =>
		{
			return column.elements || [];
		};

		this.selectSection = ({ event }) =>
		{
			event.stopPropagation();

			const id = event.currentTarget.getAttribute('data-id');

			if(this._section && id)
			{
				this._section(id);
			}
		};

		this.selectElement = ({ event }) =>
		{
			event.stopPropagation();

			const node = event.currentTarget;
			const id = node.getAttribute('data-id');
			const sid = node.getAttribute('data-sid');

			if(this._element && id)
			{
				this._element(id, sid);
			}
		};

		return `
			<div class="holder">
				<div class="header">
					<i>layers</i>
					<span>Layers</span>
				</div>
				<div class="tree">
					<div ot-for="section in sections" class="section">
						<div :data-id="section.id" :class="'row section-row' + (selected === section.id && !active ? ' active' : '')" ot-click="selectSection">
							<i class="icon">view_agenda</i>
							<span class="name">Section</span>
						</div>
						<div ot-for="column, ci in cols(section)" class="column">
							<div ot-if="cols(section).length > 1" class="row column-row">
								<i class="icon">view_column</i>
								<span class="name">Column {{ ci + 1 }}</span>
							</div>
							<div ot-for="element in items(column)" :data-id="element.id" :data-sid="section.id" :class="'row element-row' + (active === element.id ? ' active' : '')" ot-click="selectElement">
								<i class="icon">{{ icon(element.type) }}</i>
								<span class="name">{{ label(element) }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
