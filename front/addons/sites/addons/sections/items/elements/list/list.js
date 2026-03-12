elements.ItemAdd({
	id: 'editor-sections-list',
	icon: 'layers',
	name: 'Editor Sections List',
	description: 'Section tree for the layers tab.',
	category: 'Editor',
	author: 'OneType',
	config: {},
	render: function()
	{
		this.sections = [
			{
				id: 's1',
				columns: [{ width: 1, elements: [
					{ id: 'e1', type: 'hero-bold' }
				] }]
			},
			{
				id: 's2',
				columns: [{ width: 1, elements: [
					{ id: 'e2', type: 'features-grid' }
				] }]
			},
			{
				id: 's3',
				columns: [{ width: 1, elements: [
					{ id: 'e3', type: 'faq-fold' }
				] }]
			}
		];

		this.active = '';

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

		this.select = (event, context) =>
		{
			this.active = context.node.getAttribute('data-id');
		};

		this.cls = (id) =>
		{
			return id === this.active ? 'row active' : 'row';
		};

		return `
			<div class="tree">
				<div ot-for="section in sections" class="section">
					<div :class="cls(section.id)" :data-id="section.id" ot-click="select">
						<i class="icon">view_agenda</i>
						<span class="name">Section</span>
					</div>
					<div ot-for="column, ci in cols(section)" class="column">
						<div ot-if="cols(section).length > 1" class="row column-row">
							<i class="icon">view_column</i>
							<span class="name">Column {{ ci + 1 }}</span>
						</div>
						<div ot-for="element in items(column)" :class="cls(element.id)" :data-id="element.id" ot-click="select">
							<i class="icon">{{ icon(element.type) }}</i>
							<span class="name">{{ label(element) }}</span>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});