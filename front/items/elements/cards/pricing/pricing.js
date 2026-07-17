onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'cards-pricing',
		icon: 'payments',
		name: 'Pricing Card',
		description: 'Plan card with a gradient price hero, crossed out original price, included features and a call to action with a note.',
		category: 'Cards',
		collection: 'Home',
		author: 'OneType',
		config: {
			name: {
				type: 'string',
				value: 'Pro',
				description: 'Plan name.'
			},
			description: {
				type: 'string',
				value: 'For teams shipping real sites.',
				description: 'One line under the plan name.'
			},
			badge: {
				type: 'string',
				value: 'Popular',
				description: 'Label chip in the top right corner. Empty hides it.'
			},
			currency: {
				type: 'string',
				value: '$',
				description: 'Currency symbol before the price.'
			},
			price: {
				type: 'string|number',
				value: 19,
				description: 'Price value.'
			},
			original: {
				type: 'string|number',
				description: 'Crossed out original price next to the current one. Empty hides it.'
			},
			period: {
				type: 'string',
				value: 'per month',
				description: 'Muted period text under the price.'
			},
			includes: {
				type: 'string',
				value: "What's included",
				description: 'Divider label above the features. Empty hides the divider.'
			},
			features: {
				type: 'array',
				value: ['Unlimited projects', 'Custom domains', 'All packages', 'Priority support'],
				each: {
					type: 'string',
					description: 'A single feature line.'
				},
				description: 'Feature list with check marks.'
			},
			cta: {
				type: 'string',
				value: 'Get started',
				description: 'Call to action button text. Empty hides the button.'
			},
			note: {
				type: 'string',
				value: 'Cancel anytime.',
				description: 'Muted note under the button. Empty hides it.'
			},
			featured: {
				type: 'boolean',
				value: false,
				description: 'Accent top bar, ring and glow that lift the plan above the others.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the price, checks and CTA.'
			},
			href: {
				type: 'string',
				description: 'CTA link target.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the card surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_click: {
				type: 'function',
				description: 'Called with { event } on CTA click. Overrides the href navigation.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.color, 'bg-' + this.background];

				if(this.featured)
				{
					list.push('featured');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.open = (event) =>
			{
				if(this._click)
				{
					this._click({ event });
					return;
				}

				if(this.href)
				{
					window.location.href = this.href;
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div class="bar"></div>
					<div ot-if="name || description || badge" class="head">
						<div class="text">
							<h3 class="name">{{ name }}</h3>
							<span ot-if="description" class="description">{{ description }}</span>
						</div>
						<span ot-if="badge" class="badge">{{ badge }}</span>
					</div>
					<div class="hero">
						<div class="price">
							<span class="currency">{{ currency }}</span>
							<span class="amount">{{ price }}</span>
							<span ot-if="original" class="original">{{ currency }}{{ original }}</span>
						</div>
						<span ot-if="period" class="period">{{ period }}</span>
					</div>
					<div ot-if="includes && features.length" class="divider">
						<span>{{ includes }}</span>
					</div>
					<div ot-if="features.length" class="features">
						<div ot-for="feature in features" :ot-key="feature" class="feature">
							<i>check_circle</i>
							<span>{{ feature }}</span>
						</div>
					</div>
					<div class="action">
						<e-form-button
							ot-if="cta"
							:text="cta"
							:color="color"
							:style="featured ? 'solid' : 'soft'"
							:_click="open"
						></e-form-button>
						<span ot-if="note" class="note">{{ note }}</span>
					</div>
				</div>
			`;
		}
	});
});
