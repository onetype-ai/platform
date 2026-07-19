onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'cards-extension',
		icon: 'extension',
		name: 'Extension Card',
		description: 'Rich catalog card for packages, extensions, plugins and providers: accent tinted logo tile, glow on hover, status badge, meta row and an action line.',
		category: 'Cards',
		collection: 'Home',
		author: 'OneType',
		config: {
			icon: {
				type: 'string',
				value: 'extension',
				description: 'Material Symbols icon shown in the logo tile.'
			},
			image: {
				type: 'string',
				description: 'Logo image url shown instead of the icon.'
			},
			accent: {
				type: 'string',
				value: 'rgba(226, 112, 85, 1)',
				description: 'Accent color of the card as any css color. Tints the tile, the glow, the hover border and the action line.'
			},
			eyebrow: {
				type: 'string',
				value: 'Extension',
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
				description: 'Status chip in the top right corner, like Connected or Installed. Empty hides it.'
			},
			badgeColor: {
				type: 'string',
				value: 'green',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Color of the status chip.'
			},
			tags: {
				type: 'array',
				value: [],
				each: {
					type: 'string',
					description: 'A single tag.'
				},
				description: 'Small chips under the description, like the auth kind or a category.'
			},
			meta: {
				type: 'array',
				value: [],
				each: {
					type: 'string',
					description: 'A single meta entry.'
				},
				description: 'Short meta entries in the footer, separated by dots.'
			},
			action: {
				type: 'string',
				description: 'Action line text at the bottom, like Connect. Empty hides the line.'
			},
			actionIcon: {
				type: 'string',
				value: 'arrow_forward',
				description: 'Trailing icon of the action line.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the card surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			isActive: {
				type: 'boolean',
				value: false,
				description: 'Keeps the accent border and glow on, like a connected provider.'
			},
			isDisabled: {
				type: 'boolean',
				value: false,
				description: 'Dims the card and ignores clicks.'
			},
			_click: {
				type: 'function',
				description: 'Called with { event } when the card is clicked.'
			}
		},
		render: function()
		{
			this.classes = () =>
			{
				const list = ['box', 'bg-' + this.background];

				this.isActive && list.push('active');
				this.isDisabled && list.push('disabled');
				this._click && list.push('clickable');

				return list.join(' ');
			};

			this.open = (event) =>
			{
				if(this.isDisabled || !this._click)
				{
					return;
				}

				this._click({ event });
			};

			return /* html */ `
				<div :class="classes()" :style="'--accent: ' + accent" ot-click="({ event }) => open(event)">
					<div class="head">
						<span class="tile">
							<img ot-if="image" :src="image" />
							<i ot-if="!image">{{ icon }}</i>
						</span>
						<div class="titles">
							<span ot-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
							<h3 class="title">{{ title }}</h3>
						</div>
						<span ot-if="badge" :class="'badge ' + badgeColor"><span class="dot"></span>{{ badge }}</span>
					</div>
					<p ot-if="description" class="description">{{ description }}</p>
					<div ot-if="meta.length || action" class="foot">
						<div class="meta">
							<div ot-for="entry in meta" :ot-key="entry">
								<span class="entry">{{ entry }}</span>
							</div>
						</div>
						<div ot-if="action" class="action">
							<span class="text">{{ action }}</span>
							<i class="arrow">{{ actionIcon }}</i>
						</div>
					</div>
				</div>
			`;
		}
	});
});
