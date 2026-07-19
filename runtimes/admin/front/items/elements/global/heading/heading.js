onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'global-heading',
		icon: 'title',
		name: 'Heading',
		description: 'Page or section heading with eyebrow, icon tile, accented title, description and side or bottom slots.',
		category: 'Global',
		collection: 'Home',
		author: 'OneType',
		config: {
			eyebrow: {
				type: 'string',
				description: 'Uppercase label above the title.'
			},
			icon: {
				type: 'string',
				description: 'Icon in the tile before the text. Empty hides the tile.'
			},
			title: {
				type: 'string',
				value: 'Everything your site <em>needs</em>',
				description: 'Heading text. Wrap a word in <em> for the accent.'
			},
			description: {
				type: 'string',
				value: 'Packages, templates and integrations, built on one platform.',
				description: 'Subtext under the title.'
			},
			element: {
				type: 'string',
				value: 'h2',
				options: ['h1', 'h2', 'h3'],
				description: 'Heading element. Drives the scale: h1 hero, h2 section, h3 block.'
			},
			align: {
				type: 'string',
				value: 'left',
				options: ['left', 'center'],
				description: 'Content alignment.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the eyebrow, tile and the em accent.'
			},
			border: {
				type: 'boolean',
				value: false,
				description: 'Closes the heading with a bottom hairline and spacing, separating it from the content below.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.hasRight = !!this.Slots.right;
				this.hasBottom = !!this.Slots.bottom;
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.align, this.element, this.color];

				this.border && list.push('border');

				return list.join(' ');
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div class="top">
						<div ot-if="icon" class="tile"><i>{{ icon }}</i></div>
						<div class="text">
							<div ot-if="eyebrow" class="eyebrow"><span class="dash"></span>{{ eyebrow }}</div>
							<h1 ot-if="element === 'h1'" class="title"><span ot-html="title"></span></h1>
							<h2 ot-if="element === 'h2'" class="title"><span ot-html="title"></span></h2>
							<h3 ot-if="element === 'h3'" class="title"><span ot-html="title"></span></h3>
							<p ot-if="description" class="description">{{ description }}</p>
						</div>
						<div ot-if="hasRight" class="right">
							<slot name="right"></slot>
						</div>
					</div>
					<div ot-if="hasBottom" class="bottom">
						<slot name="bottom"></slot>
					</div>
				</div>
			`;
		}
	});
});
