onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-checkbox',
		icon: 'check_box',
		name: 'Checkbox',
		description: 'Checkbox with label, description, icon, count badge, indeterminate state and accent colors.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			label: {
				type: 'string',
				value: 'Email notifications',
				description: 'Checkbox label.'
			},
			description: {
				type: 'string',
				value: 'Send a digest every morning.',
				description: 'Helper text below the label.'
			},
			icon: {
				type: 'string',
				description: 'Icon between the mark and the label.'
			},
			count: {
				type: 'string|number',
				description: 'Count badge at the end.'
			},
			name: {
				type: 'string',
				description: 'Input name attribute.'
			},
			value: {
				type: 'boolean',
				value: true,
				description: 'Checked state.'
			},
			indeterminate: {
				type: 'boolean',
				value: false,
				description: 'Partial selection state.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the checked mark.'
			},
			disabled: {
				type: 'boolean',
				value: false,
				description: 'Disabled state.'
			},
			_change: {
				type: 'function',
				description: 'Called with { event, value } when the checked state changes.'
			},
			_click: {
				type: 'function',
				description: 'Called with { event, value } on click.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.hasInfo = !!this.label || !!this.description;
				this.hasCount = this.count !== undefined && this.count !== null && this.count !== '';
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', 'color-' + this.color];

				if(this.indeterminate)
				{
					list.push('indeterminate');
				}

				if(this.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.handle = ({ event }) =>
			{
				this.value = event.target.checked;
				this.indeterminate = false;

				if(this._change)
				{
					this._change({ event, value: this.value });
				}
			};

			this.click = ({ event }) =>
			{
				if(this._click)
				{
					this._click({ event, value: this.value });
				}
			};

			/* ===== LIFECYCLE ===== */

			this.OnReady(() =>
			{
				const input = this.Element ? this.Element.querySelector('input') : null;

				if(input)
				{
					input.indeterminate = !!this.indeterminate;
				}
			});

			/* ===== RENDER ===== */

			return /* html */ `
				<label :class="classes()">
					<input
						type="checkbox"
						:name="name"
						:checked="value"
						:disabled="disabled"
						ot-change="handle"
						ot-click="click"
					/>
					<span class="mark"></span>
					<i ot-if="icon" class="icon">{{ icon }}</i>
					<span ot-if="hasInfo" class="info">
						<span ot-if="label" class="label">{{ label }}</span>
						<span ot-if="description" class="description">{{ description }}</span>
					</span>
					<span ot-if="hasCount" class="count">{{ count }}</span>
				</label>
			`;
		}
	});
});
