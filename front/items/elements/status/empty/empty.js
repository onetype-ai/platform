onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'status-empty',
		icon: 'inbox',
		name: 'Empty',
		description: 'Empty state with icon, title, description, optional action button and optional surface background.',
		category: 'Status',
		collection: 'Home',
		author: 'OneType',
		config: {
			icon: {
				type: 'string',
				value: 'inbox',
				description: 'Center icon.'
			},
			title: {
				type: 'string',
				value: 'Nothing here yet',
				description: 'Heading text.'
			},
			description: {
				type: 'string',
				value: 'Once there is something to show, it will appear here.',
				description: 'Supporting message.'
			},
			action: {
				type: 'string',
				value: '',
				description: 'Action button label. Empty hides button.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Icon circle accent color.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth from 1 to 3, renders the empty state on its own bordered surface. 0 renders transparent, without background or borders.'
			},
			_click: {
				type: 'function',
				description: 'Action button click handler.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.color];

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
						<div class="circle"><i>{{ icon }}</i></div>
						<h2 ot-if="title" class="title">{{ title }}</h2>
						<p ot-if="description" class="description">{{ description }}</p>
						<e-form-button
							ot-if="action"
							:text="action"
							icon="add"
							color="brand"
							:_click="_click"
						></e-form-button>
					</div>
				</div>
			`;
		}
	});
});
