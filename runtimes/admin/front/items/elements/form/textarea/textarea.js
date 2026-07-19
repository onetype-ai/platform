onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-textarea',
		icon: 'notes',
		name: 'Textarea',
		description: 'Multi-line text input with auto-resize, character counter and focus ring.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			value: {
				type: 'string',
				description: 'Textarea value.'
			},
			name: {
				type: 'string',
				description: 'Textarea name attribute.'
			},
			placeholder: {
				type: 'string',
				value: 'Tell us about your project...',
				description: 'Placeholder text while the value is empty.'
			},
			rows: {
				type: 'number',
				value: 4,
				description: 'Initial visible rows.'
			},
			minRows: {
				type: 'number',
				description: 'Minimum rows for auto-resize.'
			},
			maxRows: {
				type: 'number',
				description: 'Maximum rows for auto-resize.'
			},
			maxlength: {
				type: 'number',
				value: 280,
				description: 'Maximum character count.'
			},
			autoResize: {
				type: 'boolean',
				value: false,
				description: 'Grow the height with the content.'
			},
			counter: {
				type: 'boolean',
				value: true,
				description: 'Show a character counter while maxlength is set.'
			},
			resize: {
				type: 'string',
				value: 'vertical',
				options: ['none', 'vertical', 'horizontal', 'both'],
				description: 'CSS resize handle.'
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
			},
			_enter: {
				type: 'function',
				description: 'Called with { value } when Enter is pressed without Shift, then the field clears. Shift and Enter inserts a newline.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.length = this.value ? this.value.length : 0;

			this.Compute(() =>
			{
				this.showCounter = this.counter && this.maxlength > 0;
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

			/* ===== HANDLERS ===== */

			this.resizeTextarea = () =>
			{
				if(!this.autoResize)
				{
					return;
				}

				const textarea = this.Element ? this.Element.querySelector('textarea') : null;

				if(!textarea)
				{
					return;
				}

				textarea.style.height = 'auto';

				const minimum = this.minRows ? this.minRows : this.rows;
				const style = getComputedStyle(textarea);
				const line = parseFloat(style.lineHeight) ? parseFloat(style.lineHeight) : 22;

				const floor = minimum * line;
				const ceiling = this.maxRows ? this.maxRows * line : Infinity;
				const scroll = textarea.scrollHeight;

				textarea.style.height = Math.max(floor, Math.min(scroll, ceiling)) + 'px';
				textarea.style.overflowY = scroll > ceiling ? 'auto' : 'hidden';
			};

			this.OnReady(() =>
			{
				this.resizeTextarea();
			});

			this.input = ({ event, value }) =>
			{
				this.value = value;
				this.length = value.length;
				this.resizeTextarea();

				if(this._input)
				{
					this._input({ event, value });
				}
			};

			this.change = ({ event, value }) =>
			{
				this.value = value;
				this.length = value.length;

				if(this._change)
				{
					this._change({ event, value });
				}
			};

			this.keydown = ({ event, value }) =>
			{
				if(event.key !== 'Enter' || event.shiftKey || !this._enter)
				{
					return;
				}

				event.preventDefault();

				if(!value.trim())
				{
					return;
				}

				this._enter({ value });

				this.value = '';
				this.length = 0;
				event.target.value = '';
				this.resizeTextarea();
			};

			this.focus = ({ event, value }) =>
			{
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

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<textarea
						:placeholder="placeholder"
						:name="name"
						:rows="rows"
						:maxlength="maxlength"
						:disabled="disabled"
						:readonly="readonly"
						:style="'resize: ' + (autoResize ? 'none' : resize)"
						autocomplete="off"
						ot-input="input"
						ot-change="change"
						ot-focus="focus"
						ot-blur="blur"
						ot-keydown="keydown"
					>{{ value }}</textarea>
					<div ot-if="showCounter" class="counter">
						<span :class="length >= maxlength ? 'full' : ''">{{ length }}</span>
						<span class="slash">/</span>
						<span>{{ maxlength }}</span>
					</div>
				</div>
			`;
		}
	});
});
