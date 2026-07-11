onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'status-error',
		icon: 'error',
		name: 'Error',
		description: 'Error state with icon, message, retry action and optional surface background.',
		category: 'Status',
		collection: 'Home',
		author: 'OneType',
		config: {
			icon: {
				type: 'string',
				value: 'error',
				description: 'Center icon name.'
			},
			title: {
				type: 'string',
				value: 'Something went wrong',
				description: 'Error heading.'
			},
			description: {
				type: 'string',
				value: 'An unexpected error occurred. Please try again.',
				description: 'Error detail text.'
			},
			action: {
				type: 'string',
				value: 'Try Again',
				description: 'Retry button label. Empty hides button.'
			},
			color: {
				type: 'string',
				value: 'red',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Icon circle accent color.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [1, 2, 3],
				description: 'Background depth from 1 to 3, renders the error state on its own bordered surface.'
			},
			_click: {
				type: 'function',
				description: 'Retry handler. Receives { event }. Reloads page if not set.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.color];

				if(this.background)
				{
					list.push('bg-' + this.background);
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.retry = ({ event }) =>
			{
				if(this._click)
				{
					this._click({ event });
					return;
				}

				window.location.reload();
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
							icon="refresh"
							color="brand"

							:_click="retry"
						></e-form-button>
					</div>
				</div>
			`;
		}
	});
});
