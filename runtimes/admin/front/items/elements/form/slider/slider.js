onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-slider',
		icon: 'linear_scale',
		name: 'Slider',
		description: 'Range slider with label, value display, marks and accent colors.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			label: {
				type: 'string',
				value: 'Memory limit',
				description: 'Label above the track.'
			},
			description: {
				type: 'string',
				description: 'Description below the label.'
			},
			name: {
				type: 'string',
				description: 'Form field name.'
			},
			value: {
				type: 'number',
				value: 64,
				description: 'Current value.'
			},
			min: {
				type: 'number',
				value: 0,
				description: 'Minimum value.'
			},
			max: {
				type: 'number',
				value: 100,
				description: 'Maximum value.'
			},
			step: {
				type: 'number',
				value: 1,
				description: 'Step increment.'
			},
			showValue: {
				type: 'boolean',
				value: true,
				description: 'Show the current value badge in the header.'
			},
			showRange: {
				type: 'boolean',
				value: true,
				description: 'Show min and max labels below the track.'
			},
			marks: {
				type: 'boolean',
				value: false,
				description: 'Show tick marks at each step.'
			},
			prefix: {
				type: 'string',
				description: 'Text before value display.'
			},
			suffix: {
				type: 'string',
				value: ' GB',
				description: 'Text after the value display.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Fill color.'
			},
			disabled: {
				type: 'boolean',
				value: false,
				description: 'Disabled state.'
			},
			_input: {
				type: 'function',
				description: 'Fires on drag. Receives { event, value }.'
			},
			_change: {
				type: 'function',
				description: 'Fires on release. Receives { event, value }.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.computeMarks = () =>
			{
				if(!this.marks || !this.step || this.step <= 0)
				{
					return [];
				}

				const range = this.max - this.min;
				const count = Math.floor(range / this.step);

				if(count > 20)
				{
					return [];
				}

				const result = [];

				for(let i = 0; i <= count; i++)
				{
					const value = this.min + i * this.step;
					const percent = (i / count) * 100;

					result.push({ value, percent });
				}

				return result;
			};

			this.Compute(() =>
			{
				this.hasInfo = !!this.label || !!this.description;
				this.marksList = this.computeMarks();
				this.hasMarks = this.marksList.length > 0;
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.color];

				if(this.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			/* ===== HELPERS ===== */

			this.format = (value) =>
			{
				return (this.prefix ? this.prefix : '') + value + (this.suffix ? this.suffix : '');
			};

			this.percentage = () =>
			{
				if(this.max === this.min)
				{
					return 0;
				}

				return ((this.value - this.min) / (this.max - this.min)) * 100;
			};


			/* ===== HANDLERS ===== */

			this.OnReady(() =>
			{
				const input = this.Element?.querySelector('input[type="range"]');

				if(input)
				{
					input.value = this.value;
				}
			});

			this.handle = ({ event }) =>
			{
				this.value = parseFloat(event.target.value);

				if(this._input)
				{
					this._input({ event, value: this.value });
				}
			};

			this.commit = ({ event }) =>
			{
				this.value = parseFloat(event.target.value);

				if(this._change)
				{
					this._change({ event, value: this.value });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div ot-if="hasInfo || showValue" class="head">
						<div ot-if="hasInfo" class="info">
							<span ot-if="label" class="label">{{ label }}</span>
							<span ot-if="description" class="description">{{ description }}</span>
						</div>
						<span ot-if="showValue" class="value">{{ format(value) }}</span>
					</div>
					<div class="control">
						<div class="track">
							<div class="fill" :style="'width: ' + percentage() + '%'"></div>
							<div ot-if="hasMarks" class="marks">
								<span
									ot-for="mark in marksList"
									:class="'mark' + (mark.value <= value ? ' active' : '')"
									:style="'left: ' + mark.percent + '%'"
								></span>
							</div>
						</div>
						<input
							type="range"
							:value="value"
							:name="name"
							:min="min"
							:max="max"
							:step="step"
							:disabled="disabled"
							ot-input="handle"
							ot-change="commit"
						/>
					</div>
					<div ot-if="showRange" class="range">
						<span class="min">{{ format(min) }}</span>
						<span class="max">{{ format(max) }}</span>
					</div>
				</div>
			`;
		}
	});
});
