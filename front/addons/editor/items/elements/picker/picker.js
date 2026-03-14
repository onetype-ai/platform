elements.ItemAdd({
	id: 'editor-picker',
	icon: 'add_box',
	name: 'Element Picker',
	description: 'Popup for picking elements by category with iframe previews.',
	category: 'Editor',
	author: 'OneType',
	config: {
		visible: {
			type: 'boolean',
			value: false
		},
		_pick: {
			type: 'function'
		},
		_close: {
			type: 'function'
		}
	},
	render: function()
	{
		this.category = 'hero';

		this.categories = [
			{ id: 'hero', label: 'Hero', icon: 'star' },
			{ id: 'features', label: 'Features', icon: 'grid_view' },
			{ id: 'cta', label: 'CTA', icon: 'ads_click' },
			{ id: 'faq', label: 'FAQ', icon: 'help' },
			{ id: 'pricing', label: 'Pricing', icon: 'payments' },
			{ id: 'testimonials', label: 'Testimonials', icon: 'format_quote' },
			{ id: 'cards', label: 'Cards', icon: 'dashboard' },
			{ id: 'footer', label: 'Footer', icon: 'call_to_action' },
			{ id: 'navigation', label: 'Navigation', icon: 'menu' },
			{ id: 'stats', label: 'Stats', icon: 'bar_chart' },
			{ id: 'logos', label: 'Logos', icon: 'branding_watermark' },
			{ id: 'contact', label: 'Contact', icon: 'mail' },
			{ id: 'team', label: 'Team', icon: 'group' },
			{ id: 'gallery', label: 'Gallery', icon: 'photo_library' },
			{ id: 'blog', label: 'Blog', icon: 'article' },
			{ id: 'forms', label: 'Forms', icon: 'edit_note' },
			{ id: 'process', label: 'Process', icon: 'route' }
		];

		this.elements = {
			hero: [
				{ type: 'hero-bold', label: 'Bold Hero' },
				{ type: 'hero-split', label: 'Split Hero' },
				{ type: 'hero-stack', label: 'Stack Hero' },
				{ type: 'hero-glass', label: 'Glass Hero' },
				{ type: 'hero-video', label: 'Video Hero' },
				{ type: 'hero-card', label: 'Card Hero' }
			],
			features: [
				{ type: 'features-grid', label: 'Grid Features' },
				{ type: 'features-zigzag', label: 'Zigzag Features' },
				{ type: 'features-bento', label: 'Bento Features' },
				{ type: 'features-tabs', label: 'Tabs Features' }
			],
			cta: [
				{ type: 'cta-bold', label: 'Bold CTA' },
				{ type: 'cta-split', label: 'Split CTA' },
				{ type: 'cta-card', label: 'Card CTA' }
			],
			faq: [
				{ type: 'faq-fold', label: 'Fold FAQ' },
				{ type: 'faq-grid', label: 'Grid FAQ' },
				{ type: 'faq-tabs', label: 'Tabs FAQ' },
				{ type: 'faq-split', label: 'Split FAQ' }
			],
			pricing: [
				{ type: 'pricing-grid', label: 'Grid Pricing' },
				{ type: 'pricing-flat', label: 'Flat Pricing' },
				{ type: 'pricing-glass', label: 'Glass Pricing' }
			],
			testimonials: [
				{ type: 'testimonials-quote', label: 'Quote Spotlight' },
				{ type: 'testimonials-grid', label: 'Grid Wall' },
				{ type: 'testimonials-slide', label: 'Slide Carousel' }
			],
			cards: [
				{ type: 'cards-stack', label: 'Stack Card' },
				{ type: 'cards-overlay', label: 'Overlay Card' },
				{ type: 'cards-feature', label: 'Feature Card' }
			],
			footer: [
				{ type: 'footer-base', label: 'Base Footer' },
				{ type: 'footer-cta', label: 'CTA Footer' },
				{ type: 'footer-slim', label: 'Slim Footer' }
			],
			navigation: [
				{ type: 'navigation-apex', label: 'Apex Navigation' },
				{ type: 'navigation-dock', label: 'Dock Navigation' },
				{ type: 'navigation-glass', label: 'Glass Navigation' }
			],
			stats: [
				{ type: 'stats-bold', label: 'Bold Stats' },
				{ type: 'stats-card', label: 'Card Stats' },
				{ type: 'stats-ring', label: 'Ring Stats' }
			],
			logos: [
				{ type: 'logos-row', label: 'Row Logos' },
				{ type: 'logos-marquee', label: 'Marquee Logos' }
			],
			contact: [
				{ type: 'contact-split', label: 'Split Contact' },
				{ type: 'contact-grid', label: 'Grid Contact' }
			],
			team: [
				{ type: 'team-grid', label: 'Grid Team' },
				{ type: 'team-cards', label: 'Cards Team' }
			],
			gallery: [
				{ type: 'gallery-grid', label: 'Grid Gallery' },
				{ type: 'gallery-masonry', label: 'Masonry Gallery' }
			],
			blog: [
				{ type: 'blog-grid', label: 'Grid Blog' },
				{ type: 'blog-hero', label: 'Hero Blog' }
			],
			forms: [
				{ type: 'forms-basic', label: 'Basic Form' },
				{ type: 'forms-split', label: 'Split Form' }
			],
			process: [
				{ type: 'process-steps', label: 'Steps Process' },
				{ type: 'process-timeline', label: 'Timeline Process' }
			]
		};

		this.filtered = () =>
		{
			return this.elements[this.category] || [];
		};

		this.preview = (type) =>
		{
			return 'https://preview.elements.onetype.ai/' + type + '?single:boolean=true';
		};

		this.select = ({ event }) =>
		{
			event.stopPropagation();

			const type = event.currentTarget.getAttribute('data-type');

			if(this._pick && type)
			{
				this._pick(type, {});
			}
		};

		this.tab = ({ event }) =>
		{
			event.stopPropagation();

			const id = event.currentTarget.getAttribute('data-id');

			if(id)
			{
				this.category = id;
			}
		};

		this.close = (event) =>
		{
			event.stopPropagation();

			if(this._close)
			{
				this._close();
			}
		};

		this.stop = (event) =>
		{
			event.stopPropagation();
		};

		return `
			<div ot-if="visible" class="holder" ot-click="close">
				<div class="popup" ot-click="stop">
					<div class="header">
						<span class="title">Add Element</span>
						<button class="close" ot-click="close"><i>close</i></button>
					</div>
					<div class="body">
						<div class="sidebar">
							<button ot-for="cat in categories" :data-id="cat.id" :class="'tab' + (category === cat.id ? ' active' : '')" ot-click="tab">
								<i>{{ cat.icon }}</i>
								<span>{{ cat.label }}</span>
							</button>
						</div>
						<div class="items">
							<div ot-for="item in filtered()" :data-type="item.type" class="item" ot-click="select">
								<div class="preview">
									<iframe :src="preview(item.type)" scrolling="no" class="frame"></iframe>
								</div>
								<span class="label">{{ item.label }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
