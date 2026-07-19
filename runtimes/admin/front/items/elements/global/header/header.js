onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'global-header',
		icon: 'web_asset',
		name: 'Header',
		description: 'Detail page header: accent tinted logo tile, back link, eyebrow, title, description, status badge, meta row and an actions slot on the right.',
		category: 'Global',
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
				description: 'Accent color of the tile as any css color.'
			},
			eyebrow: {
				type: 'string',
				description: 'Uppercase label above the title.'
			},
			title: {
				type: 'string',
				value: 'Title',
				description: 'Page title.'
			},
			description: {
				type: 'string',
				description: 'Supporting text under the title.'
			},
			badge: {
				type: 'string',
				description: 'Status chip next to the title, like Connected. Empty hides it.'
			},
			badgeColor: {
				type: 'string',
				value: 'green',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Color of the status chip.'
			},
			meta: {
				type: 'array',
				value: [],
				each: {
					type: 'string',
					description: 'A single meta entry.'
				},
				description: 'Short meta entries under the description, separated by dots.'
			},
			background: {
				type: 'number',
				value: 0,
				options: [0, 1, 2, 3],
				description: 'Background depth of the header band from 1 to 3, closed with a bottom border. 0 renders transparent, without background or borders.'
			},
			container: {
				type: 'string',
				options: ['s', 'm', 'l', 'full'],
				description: 'Constrains the content to a centered container of that size, for full width headers with a background. Empty spans the parent.'
			},
			pattern: {
				type: 'string',
				options: ['dots', 'lines'],
				description: 'Backdrop pattern drawn across the header surface while a background is set. Empty renders a plain surface.'
			}
		},
		render: function()
		{
			return /* html */ `
				<div :class="'box' + (background ? ' bg-' + background : '') + (background && pattern ? ' ' + pattern : '')" :style="'--accent: ' + accent">
					<div :class="container ? 'inner ot-container-' + container : 'inner'">
						<div class="top"><slot name="top"></slot></div>
						<div class="row">
						<span class="tile">
							<img ot-if="image" :src="image" />
							<i ot-if="!image">{{ icon }}</i>
						</span>
						<div class="titles">
							<span ot-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
							<div class="line">
								<h1 class="title">{{ title }}</h1>
								<span ot-if="badge" :class="'badge ' + badgeColor"><span class="dot"></span>{{ badge }}</span>
							</div>
							<p ot-if="description" class="description">{{ description }}</p>
							<div ot-if="meta.length" class="meta">
								<div ot-for="entry in meta" :ot-key="entry">
									<span class="entry">{{ entry }}</span>
								</div>
							</div>
						</div>
						<div class="actions">
							<slot name="actions"></slot>
						</div>
						</div>
						<div class="bottom"><slot name="bottom"></slot></div>
					</div>
				</div>
			`;
		}
	});
});
