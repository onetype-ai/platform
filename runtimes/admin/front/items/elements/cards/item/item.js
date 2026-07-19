onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'cards-item',
		icon: 'dashboard',
		name: 'Item Card',
		description: 'Lean content card with icon tile, eyebrow, title, description, badge and a meta row pinned to the bottom.',
		category: 'Cards',
		collection: 'Home',
		author: 'OneType',
		config: {
			icon: {
				type: 'string',
				value: 'extension',
				description: 'Material Symbols icon shown in the tile at the top of the card.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the icon tile and badge.'
			},
			eyebrow: {
				type: 'string',
				value: 'Package',
				description: 'Uppercase label above the title.'
			},
			title: {
				type: 'string',
				value: 'Forms',
				description: 'Card title.'
			},
			description: {
				type: 'string',
				value: 'Build forms with validation, steps and every field type.',
				description: 'Supporting text under the title, clamped to two lines.'
			},
			badge: {
				type: 'string',
				value: 'New',
				description: 'Small label chip in the top right corner. Empty hides it.'
			},
			meta: {
				type: 'array',
				value: ['1.3.0', '12k installs'],
				each: {
					type: 'string',
					description: 'A single meta entry.'
				},
				description: 'Short meta entries pinned to the bottom, separated by dots.'
			},
			href: {
				type: 'string',
				description: 'Link target. When set the card renders as an anchor.'
			},
			isActive: {
				type: 'boolean',
				value: false,
				description: 'Highlights the card with an accent ring.'
			},
			isDisabled: {
				type: 'boolean',
				value: false,
				description: 'Dims the card and ignores clicks.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the card surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_click: {
				type: 'function',
				description: 'Called with { event } on click. Overrides the href navigation.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.color, 'bg-' + this.background];

				if(this.isActive)
				{
					list.push('active');
				}

				if(this.isDisabled)
				{
					list.push('disabled');
				}

				if(this._click || this.href)
				{
					list.push('clickable');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.open = (event) =>
			{
				if(this.isDisabled)
				{
					return;
				}

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
				<div :class="classes()" ot-click="({ event }) => open(event)">
					<div ot-if="icon || badge" class="head">
						<div ot-if="icon" class="tile"><i>{{ icon }}</i></div>
						<span ot-if="badge" class="badge">{{ badge }}</span>
					</div>
					<div class="body">
						<span ot-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
						<h3 ot-if="title" class="title">{{ title }}</h3>
						<p ot-if="description" class="description">{{ description }}</p>
					</div>
					<div ot-if="meta.length" class="meta">
						<div ot-for="entry in meta" :ot-key="entry">
							<span class="entry">{{ entry }}</span>
						</div>
					</div>
					<div class="bottom">
						<slot name="bottom"></slot>
					</div>
				</div>
			`;
		}
	});
});
