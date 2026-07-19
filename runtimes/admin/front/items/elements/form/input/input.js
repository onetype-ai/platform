onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-input',
		icon: 'input',
		name: 'Input',
		description: 'Text input with icons, prefix and suffix, password toggle, clear action and autocomplete suggestions.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			value: {
				type: 'string|number',
				description: 'Input value.'
			},
			name: {
				type: 'string',
				description: 'Input name attribute.'
			},
			type: {
				type: 'string',
				value: 'text',
				options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'time', 'date'],
				description: 'Input type.'
			},
			placeholder: {
				type: 'string',
				value: 'Search the workspace...',
				description: 'Placeholder text while the value is empty.'
			},
			icon: {
				type: 'string',
				description: 'Icon on the left side of the input.'
			},
			iconRight: {
				type: 'string',
				description: 'Icon on the right side of the input.'
			},
			prefix: {
				type: 'string',
				description: 'Static text before the value.'
			},
			suffix: {
				type: 'string',
				description: 'Static text after the value.'
			},
			options: {
				type: 'array|function',
				value: [],
				each: {
					type: 'string',
					description: 'A single suggestion.'
				},
				description: 'Autocomplete suggestions shown while typing, or an async callback(query, "search") that returns suggestions.'
			},
			restrict: {
				type: 'boolean',
				value: false,
				description: 'Only allow values from options.'
			},
			reveal: {
				type: 'boolean',
				value: true,
				description: 'Shows the visibility toggle on password inputs.'
			},
			clearable: {
				type: 'boolean',
				value: true,
				description: 'Show a clear action while a value is present.'
			},
			maxlength: {
				type: 'number',
				description: 'Maximum character count.'
			},
			min: {
				type: 'number',
				description: 'Minimum value for a number input.'
			},
			max: {
				type: 'number',
				description: 'Maximum value for a number input.'
			},
			step: {
				type: 'number',
				description: 'Step increment for a number input.'
			},
			disabled: {
				type: 'boolean',
				value: false,
				description: 'Disabled state.'
			},
			readonly: {
				type: 'boolean',
				value: false,
				description: 'Readonly state.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the control surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_input: {
				type: 'function',
				description: 'Called with { event, value } on every keystroke.'
			},
			_change: {
				type: 'function',
				description: 'Called with { event, value } when the value is committed.'
			},
			_focus: {
				type: 'function',
				description: 'Called with { event, value } on focus.'
			},
			_blur: {
				type: 'function',
				description: 'Called with { event, value } on blur.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.open = false;
			this.active = null;
			this.revealed = false;

			elements.Fn('source', this, () => this.options);

			this.Compute(() =>
			{
				this.hasOptions = this.sourced ? true : this.options.length > 0;
				this.isPassword = this.type === 'password';
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', 'bg-' + this.background];

				if(this.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			/* ===== HELPERS ===== */

			this.text = () =>
			{
				return this.value === undefined || this.value === null ? '' : String(this.value);
			};

			this.inputType = () =>
			{
				return this.isPassword && this.revealed ? 'text' : this.type;
			};

			this.filtered = () =>
			{
				if(!this.hasOptions)
				{
					return [];
				}

				if(this.sourced)
				{
					return this.results.map((option) => option.label);
				}

				const query = this.text().toLowerCase();

				if(!query)
				{
					return this.options;
				}

				return this.options.filter((option) => String(option).toLowerCase().includes(query));
			};

			this.cast = (value) =>
			{
				if(this.type !== 'number')
				{
					return value;
				}

				const number = Number(value);

				return Number.isFinite(number) ? number : null;
			};

			/* ===== HANDLERS ===== */

			this.input = ({ event, value }) =>
			{
				value = this.cast(value);

				this.value = value;
				this.active = null;

				if(this.sourced)
				{
					this.search(value);
					this.open = true;
				}
				else if(this.hasOptions)
				{
					this.open = this.filtered().length > 0;
				}

				if(this._input)
				{
					this._input({ event, value });
				}
			};

			this.change = ({ event, value }) =>
			{
				value = this.cast(value);

				if(this.restrict && this.hasOptions && !this.filtered().includes(value))
				{
					this.value = '';

					if(this._change)
					{
						this._change({ event, value: '' });
					}

					return;
				}

				this.value = value;

				if(this._change)
				{
					this._change({ event, value });
				}
			};

			this.focus = ({ event, value }) =>
			{
				if(this.hasOptions && this.filtered().length > 0)
				{
					this.open = true;
				}

				if(this._focus)
				{
					this._focus({ event, value });
				}
			};

			this.blur = ({ event, value }) =>
			{
				if(this._blur)
				{
					this._blur({ event, value });
				}
			};

			this.move = (step) =>
			{
				const filtered = this.filtered();

				if(!filtered.length)
				{
					return;
				}

				const index = filtered.indexOf(this.active);

				this.active = filtered[Math.min(Math.max(index + step, 0), filtered.length - 1)];
				this.open = true;
			};

			this.keydown = ({ event }) =>
			{
				if(!this.hasOptions)
				{
					return;
				}

				if(event.key === 'Enter')
				{
					const filtered = this.filtered();

					if(this.open && filtered.length)
					{
						event.preventDefault();
						this.select(this.active !== null && filtered.includes(this.active) ? this.active : filtered[0]);
					}

					return;
				}

				if(event.key === 'ArrowDown')
				{
					event.preventDefault();
					this.move(1);
					return;
				}

				if(event.key === 'ArrowUp')
				{
					event.preventDefault();
					this.move(-1);
					return;
				}

				if(event.key === 'Escape')
				{
					this.open = false;
				}
			};

			this.select = (option) =>
			{
				this.value = option;
				this.open = false;
				this.active = null;

				if(this._change)
				{
					this._change({ event: null, value: option });
				}
			};

			this.close = () =>
			{
				this.open = false;
			};

			this.clear = () =>
			{
				this.value = '';
				this.open = false;

				if(this._change)
				{
					this._change({ event: null, value: '' });
				}
			};

			this.togglePassword = () =>
			{
				this.revealed = !this.revealed;
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()" ot-click-outside="close">
					<div class="field">
						<i ot-if="icon" class="icon">{{ icon }}</i>
						<span ot-if="prefix" class="affix">{{ prefix }}</span>
						<input
							class="input"
							:value="value"
							:type="inputType()"
							:placeholder="placeholder"
							:name="name"
							:maxlength="maxlength"
							:min="min"
							:max="max"
							:step="step"
							:disabled="disabled"
							:readonly="readonly"
							autocomplete="off"
							ot-input="input"
							ot-change="change"
							ot-focus="focus"
							ot-blur="blur"
							ot-keydown="keydown"
						/>
						<span ot-if="suffix" class="affix">{{ suffix }}</span>
						<button
							ot-if="clearable && text() && !disabled && !readonly"
							type="button"
							class="action"
							ot-click.stop="clear"
							:ot-tooltip="{ text: 'Clear', position: { x: 'center', y: 'top' } }"
						>
							<i>close</i>
						</button>
						<button
							ot-if="reveal && isPassword && !disabled"
							type="button"
							class="action"
							ot-click.stop="togglePassword"
							:ot-tooltip="{ text: revealed ? 'Hide' : 'Show', position: { x: 'center', y: 'top' } }"
						>
							<i ot-if="!revealed">visibility</i>
							<i ot-if="revealed">visibility_off</i>
						</button>
						<i ot-if="iconRight" class="icon">{{ iconRight }}</i>
					</div>
					<div ot-if="open && hasOptions" class="dropdown">
						<div ot-for="option in filtered()" :ot-key="option">
							<button
								type="button"
								:class="'option' + (option === active ? ' active' : '')"
								ot-click="() => select(option)"
							>{{ option }}</button>
						</div>
					</div>
				</div>
			`;
		}
	});
});
