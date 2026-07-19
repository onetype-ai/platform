onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-options',
		icon: 'view_week',
		name: 'Options',
		description: 'Segmented control picking one or more options, with icon, label or both per option.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			value: {
				type: 'string|number|array',
				value: 'board',
				each: {
					type: 'string|number',
					description: 'A single selected value.'
				},
				description: 'Selected option value, an array of values while multiple is on.'
			},
			name: {
				type: 'string',
				description: 'Hidden input name for forms.'
			},
			multiple: {
				type: 'boolean',
				value: false,
				description: 'Allows selecting more than one option, clicking a selected option unselects it.'
			},
			options: {
				type: 'array',
				value: [
					{ value: 'list', label: 'List', icon: 'list' },
					{ value: 'board', label: 'Board', icon: 'view_kanban' },
					{ value: 'timeline', label: 'Timeline', icon: 'timeline' }
				],
				each: {
					type: 'object',
					config: {
						value: {
							type: 'string|number',
							description: 'Value the option selects.'
						},
						label: {
							type: 'string',
							description: 'Option text.'
						},
						icon: {
							type: 'string',
							description: 'Material icon name.'
						},
						tooltip: {
							type: 'string',
							description: 'Hover tooltip, useful for icon only options.'
						},
						disabled: {
							type: 'boolean',
							description: 'Disabled state of the option.'
						}
					}
				},
				description: 'Selectable options.'
			},
			stretch: {
				type: 'boolean',
				value: false,
				description: 'Stretch to the container width with evenly sized options.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the selected option.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the track surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			disabled: {
				type: 'boolean',
				value: false,
				description: 'Disabled state of the whole control.'
			},
			_change: {
				type: 'function',
				description: 'Called with { event, value } when the selection changes.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', 'bg-' + this.background, 'color-' + this.color];

				if(this.stretch)
				{
					list.push('stretch');
				}

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
