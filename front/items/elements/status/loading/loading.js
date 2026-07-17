onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'status-loading',
		icon: 'progress_activity',
		name: 'Loading',
		description: 'Loading state with spinner, optional message and optional surface background.',
		category: 'Status',
		collection: 'Home',
		author: 'OneType',
		config: {
			text: {
				type: 'string',
				value: 'Loading...',
				description: 'Message below spinner. Empty renders the spinner alone.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Spinner color.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth from 1 to 3, renders the loading state on its own bordered surface. 0 renders transparent, without background or borders.'
			},
			blur: {
				type: 'boolean',
				value: false,
				description: 'Translucent blurred surface instead of a solid one. Applies while background is set.'
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
					<div class="circle"><i class="spin">progress_activity</i></div>
					<span ot-if="text" class="text">{{ text }}</span>
				</div>
			`;
		}
	});
});
