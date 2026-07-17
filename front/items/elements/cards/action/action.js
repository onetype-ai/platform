onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'cards-action',
		icon: 'bolt',
		name: 'Action Card',
		description: 'Single action card with icon tile, label, description, hint badge and an arrow on hover.',
		category: 'Cards',
		collection: 'Home',
		author: 'OneType',
		config: {
			icon: {
				type: 'string',
				value: 'rocket_launch',
				description: 'Leading Material Symbols icon.'
			},
			label: {
				type: 'string',
				value: 'Deploy site',
				description: 'Action title.'
			},
			description: {
				type: 'string',
				value: 'Publish the latest changes',
				description: 'Muted text under the label.'
			},
			hint: {
				type: 'string',
				description: 'Short badge on the right, like a count or a shortcut.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the tile, hint and hover.'
			},
			isDisabled: {
				type: 'boolean',
				value: false,
				description: 'Dims the action and blocks the click.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the card surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_click: {
				type: 'function',
				description: 'Called with { event } on click.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.color, 'bg-' + this.background];

				if(this.isDisabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.run = (event) =>
			{
				if(!this.isDisabled && this._click)
				{
					this._click({ event });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<button type="button" :class="classes()" ot-click="({ event }) => run(event)">
					<div ot-if="icon" class="wrap"><i>{{ icon }}</i></div>
					<div class="text">
						<span class="label">{{ label }}</span>
						<span ot-if="description" class="description">{{ description }}</span>
					</div>
					<span ot-if="hint" class="hint">{{ hint }}</span>
					<i class="go">arrow_forward</i>
				</button>
			`;
		}
	});
});
