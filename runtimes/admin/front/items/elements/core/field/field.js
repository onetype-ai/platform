onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'core-field',
		icon: 'space_dashboard',
		name: 'Field',
		description: 'Form field wrapper with label, description, hint, required mark and an error state around any control.',
		category: 'Core',
		collection: 'Home',
		author: 'OneType',
		config: {
			label: {
				type: 'string',
				value: 'Work email',
				description: 'Field label.'
			},
			description: {
				type: 'string',
				value: 'Used for sign in and notifications.',
				description: 'Helper text below the label.'
			},
			hint: {
				type: 'string',
				description: 'Tooltip text on the info icon next to the label.'
			},
			error: {
				type: 'string',
				description: 'Error message below the control. Tints the control red while set.'
			},
			required: {
				type: 'boolean',
				value: true,
				description: 'Red asterisk on the label.'
			},
			orientation: {
				type: 'string',
				value: 'horizontal',
				options: ['horizontal', 'vertical'],
				description: 'Label and control side by side, or stacked.'
			},
			background: {
				type: 'number',
				value: 0,
				options: [0, 1, 2, 3],
				description: 'Background depth from 1 to 3, 0 for none. Without a background the field has no padding.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.hasInfo = !!this.label || !!this.description;
				this.hasError = !!this.error;
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.orientation];

				if(this.background)
				{
					list.push('filled', 'bg-' + this.background);
				}

				if(this.hasError)
				{
					list.push('error');
				}

				return list.join(' ');
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div ot-if="hasInfo" class="info">
						<label ot-if="label" class="label">
							<span>{{ label }}</span>
							<span ot-if="required" class="required">*</span>
							<i ot-if="hint" class="hint" :ot-tooltip="{ text: hint, position: { x: 'center', y: 'top' } }">info</i>
						</label>
						<p ot-if="description" class="description">{{ description }}</p>
					</div>
					<div class="control">
						<div class="input">
							<slot name="input"></slot>
						</div>
						<div ot-if="hasError" class="message">
							<i>error</i>
							<span>{{ error }}</span>
						</div>
					</div>
				</div>
			`;
		}
	});
});
