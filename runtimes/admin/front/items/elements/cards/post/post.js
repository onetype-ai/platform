onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'cards-post',
		icon: 'article',
		name: 'Post Card',
		description: 'Content card with cover image, eyebrow, title, excerpt, tags and an author row with date.',
		category: 'Cards',
		collection: 'Home',
		author: 'OneType',
		config: {
			cover: {
				type: 'string',
				description: 'Cover image URL. Empty renders a colored gradient cover with the icon.'
			},
			icon: {
				type: 'string',
				value: 'article',
				description: 'Icon shown on the gradient cover while no image is set.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the gradient cover and tags.'
			},
			eyebrow: {
				type: 'string',
				value: 'Engineering',
				description: 'Uppercase label above the title.'
			},
			title: {
				type: 'string',
				value: 'Designing the OneType shell',
				description: 'Post title, clamped to two lines.'
			},
			excerpt: {
				type: 'string',
				value: 'How we turned the editor chrome into a quiet, floating workspace that gets out of the way.',
				description: 'Short excerpt under the title, clamped to two lines.'
			},
			tags: {
				type: 'array',
				value: ['Design', 'Platform'],
				each: {
					type: 'string',
					description: 'A single tag.'
				},
				description: 'Small tags under the excerpt.'
			},
			author: {
				type: 'string',
				value: 'Dejan Tomić',
				description: 'Author name in the bottom row.'
			},
			avatar: {
				type: 'string',
				description: 'Author avatar URL. Empty renders initials.'
			},
			date: {
				type: 'string',
				value: 'Jul 10, 2026',
				description: 'Publish date in the bottom row.'
			},
			href: {
				type: 'string',
				description: 'Link target. When set the card renders as a link.'
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

				if(this._click || this.href)
				{
					list.push('clickable');
				}

				return list.join(' ');
			};

			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.initials = this.author.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase();
			});

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
				<div :class="classes()" ot-click="({ event }) => open(event)">
					<div class="cover">
						<img ot-if="cover" :src="cover" alt="" loading="lazy" />
						<div ot-if="!cover" class="fallback"><i>{{ icon }}</i></div>
					</div>
					<div class="body">
						<span ot-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
						<h3 ot-if="title" class="title">{{ title }}</h3>
						<p ot-if="excerpt" class="excerpt">{{ excerpt }}</p>
						<div ot-if="tags.length" class="tags">
							<div ot-for="tag in tags" :ot-key="tag">
								<span class="tag">{{ tag }}</span>
							</div>
						</div>
					</div>
					<div ot-if="author || date" class="foot">
						<div ot-if="author" class="who">
							<img ot-if="avatar" class="avatar" :src="avatar" alt="" />
							<span ot-if="!avatar" class="initials">{{ initials }}</span>
							<span class="name">{{ author }}</span>
						</div>
						<span ot-if="date" class="date">{{ date }}</span>
					</div>
				</div>
			`;
		}
	});
});
