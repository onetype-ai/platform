onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-radio',
		icon: 'radio_button_checked',
		name: 'Radio',
		description: 'Radio button with label, description, icon, count badge and accent colors.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			label: {
				type: 'string',
				value: 'Monthly billing',
				description: 'Primary label.'
			},
			description: {
				type: 'string',
				value: 'Pay month to month, cancel anytime.',
				description: 'Secondary description below the label.'
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
				value: 'billing',
				description: 'Group name for mutual exclusion.'
			},
			option: {
				type: 'string',
				value: 'monthly',
				description: 'Value sent to the group.'
			},
			value: {
				type: 'boolean',
				value: true,
				description: 'Checked state.'
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

				if(this.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.handle = ({ event }) =>
			{
				if(this.disabled)
				{
					return;
				}

				this.value = event.target.checked;

				if(this._change)
				{
					this._change({ event, value: this.value });
				}
			};

			this.click = ({ event }) =>
			{
				if(this.disabled)
				{
					return;
				}

				if(this._click)
				{
					this._click({ event, value: this.value });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<label :class="classes()">
					<input
						type="radio"
						:name="name"
						:value="option"
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
