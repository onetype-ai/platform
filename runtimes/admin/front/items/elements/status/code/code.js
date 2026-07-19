onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'status-code',
		icon: 'explore_off',
		name: 'Code',
		description: 'Full-page status code with large number, message, action button and optional surface background.',
		category: 'Status',
		collection: 'Home',
		author: 'OneType',
		config: {
			code: {
				type: 'string',
				value: '404',
				description: 'Status code number.'
			},
			title: {
				type: 'string',
				value: 'Page not found',
				description: 'Heading below the code.'
			},
			description: {
				type: 'string',
				value: "The page you're looking for doesn't exist or has been moved.",
				description: 'Paragraph below the title.'
			},
			action: {
				type: 'string',
				value: 'Go Home',
				description: 'Button label. Empty hides button.'
			},
			href: {
				type: 'string',
				value: '/',
				description: 'Button link target.'
			},
			color: {
				type: 'string',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Code number gradient accent.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth from 1 to 3, renders the status code on its own bordered surface. 0 renders transparent, without background or borders.'
			},
			_click: {
				type: 'function',
				description: 'Action button click handler. Overrides the href navigation.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box'];

				if(this.color)
				{
					list.push(this.color);
				}

				if(this.background || this.background === 0)
				{
					list.push('bg-' + this.background);
				}

				return list.join(' ');
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div class="inner">
						<span class="code">{{ code }}</span>
						<h2 ot-if="title" class="title">{{ title }}</h2>
						<p ot-if="description" class="description">{{ description }}</p>
						<e-form-button
							ot-if="action"
							:text="action"
							icon="home"
							color="brand"
							:href="_click ? null : href"
							:_click="_click"
						></e-form-button>
					</div>
				</div>
			`;
		}
	});
});
