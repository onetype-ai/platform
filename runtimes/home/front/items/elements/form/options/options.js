onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-options',
		icon: 'view_week',
		name: 'Options',
		description: 'Segmented control picking one option, with icon, label or both per option.',
		category: 'Form',
		config:
		{
			value:
			{
				type: 'string|number|array',
				value: '',
				each: { type: 'string|number' },
				description: 'Selected option value, an array of values when multiple is on.'
			},
			name:
			{
				type: 'string',
				value: '',
				description: 'Hidden input name for forms.'
			},
			multiple:
			{
				type: 'boolean',
				value: false,
				description: 'Allows selecting more than one option, clicking a selected option unselects it.'
			},
			options:
			{
				type: 'array',
				value: [],
				description: 'Selectable options.',
				each:
				{
					type: 'object',
					config:
					{
						value:
						{
							type: 'string|number',
							description: 'Value the option selects.'
						},
						label:
						{
							type: 'string',
							description: 'Option text.'
						},
						icon:
						{
							type: 'string',
							description: 'Material icon name.'
						},
						tooltip:
						{
							type: 'string',
							description: 'Hover tooltip, useful for icon only options.'
						},
						disabled:
						{
							type: 'boolean',
							description: 'Disabled state of the option.'
						}
					}
				}
			},
			size:
			{
				type: 'string',
				value: 'm',
				options: ['s', 'm', 'l'],
				description: 'Control height.'
			},
			background:
			{
				type: 'string',
				value: 'bg-2',
				options: ['bg-1', 'bg-2', 'bg-3', 'bg-4', 'transparent'],
				description: 'Track background depth.'
			},
			color:
			{
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Selected accent color.'
			},
			variant:
			{
				type: 'array',
				value: [],
				each: { type: 'string' },
				options: ['border', 'full', 'glass'],
				description: 'Visual modifiers. border draws the track edge, full stretches to the container, glass floats on a blurred backdrop.'
			},
			disabled:
			{
				type: 'boolean',
				value: false,
				description: 'Disabled state of the whole control.'
			},
			_change:
			{
				type: 'function',
				description: 'Change handler. Receives { event, value }.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.background, 'size-' + this.size, 'color-' + this.color];

				this.variant.forEach((variant) => list.push(variant));

				if(this.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			this.selected = (option) =>
			{
				if(this.multiple)
				{
					return Array.isArray(this.value) && this.value.includes(option.value);
				}

				return option.value === this.value;
			};

			this.item = (option) =>
			{
				const list = ['option'];

				if(this.selected(option))
				{
					list.push('selected');
				}

				if(option.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.handle = ({ event }, option) =>
			{
				if(this.disabled || option.disabled)
				{
					return;
				}

				if(this.multiple)
				{
					const current = Array.isArray(this.value) ? this.value : [];

					this.value = event.target.checked ? [...current, option.value] : current.filter((value) => value !== option.value);
				}
				else
				{
					if(option.value === this.value)
					{
						return;
					}

					this.value = option.value;
				}

				if(this._change)
				{
					this._change({ event, value: this.value });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<label
						ot-for="option in options"
						:ot-key="option.value"
						:class="item(option)"
						:ot-tooltip="option.tooltip ? { text: option.tooltip, position: { x: 'center', y: 'top' } } : null"
					>
						<input
							:type="multiple ? 'checkbox' : 'radio'"
							:name="name"
							:value="option.value"
							:checked="selected(option)"
							:disabled="disabled || option.disabled"
							ot-change="(event) => handle(event, option)"
						/>
						<i ot-if="option.icon">{{ option.icon }}</i>
						<span ot-if="option.label">{{ option.label }}</span>
					</label>
				</div>
			`;
		}
	});
});
