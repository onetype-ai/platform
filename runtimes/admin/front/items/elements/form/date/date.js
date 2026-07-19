onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-date',
		icon: 'calendar_today',
		name: 'Date',
		description: 'Date picker with native input, min and max range, quick presets and a clear action.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			value: {
				type: 'string',
				description: 'Selected date in ISO format (YYYY-MM-DD).'
			},
			name: {
				type: 'string',
				description: 'Input name attribute.'
			},
			min: {
				type: 'string',
				description: 'Minimum selectable date (YYYY-MM-DD).'
			},
			max: {
				type: 'string',
				description: 'Maximum selectable date (YYYY-MM-DD).'
			},
			presets: {
				type: 'array',
				value: [],
				each: {
					type: 'object',
					config: {
						label: {
							type: 'string',
							description: 'Preset button text.'
						},
						value: {
							type: 'string',
							description: 'Date the preset selects (YYYY-MM-DD).'
						}
					}
				},
				description: 'Quick pick preset buttons below the field.'
			},
			disabled: {
				type: 'boolean',
				value: false,
				description: 'Disabled state.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the control surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_change: {
				type: 'function',
				description: 'Called with { event, value } when the date changes.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			if(this.value && typeof this.value === 'string' && this.value.length > 10)
			{
				this.value = this.value.slice(0, 10);
			}

			const today = new Date().toISOString().slice(0, 10);

			this.todayIso = today;
			this.isToday = this.value === today;

			this.Compute(() =>
			{
				this.hasPresets = this.presets.length > 0;
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', 'bg-' + this.background];

				if(this.disabled)
				{
					list.push('disabled');
				}

				if(this.isToday)
				{
					list.push('today');
				}

				return list.join(' ');
			};

			/* ===== HELPERS ===== */

			this.inRange = (iso) =>
			{
				if(this.min && iso < this.min)
				{
					return false;
				}

				if(this.max && iso > this.max)
				{
					return false;
				}

				return true;
			};

			/* ===== HANDLERS ===== */

			this.handle = ({ event, value }) =>
			{
				this.value = value;
				this.isToday = value === this.todayIso;

				if(this._change)
				{
					this._change({ event, value });
				}
			};

			this.openPicker = (event) =>
			{
				if(this.disabled)
				{
					return;
				}

				const target = event ? event.target : null;
				const field = target && target.closest ? target.closest('.field') : null;
				const input = field ? field.querySelector('.input') : null;

				if(!input)
				{
					return;
				}

				input.focus();

				if(typeof input.showPicker === 'function')
				{
					try
					{
						input.showPicker();
					}
					catch(error)
					{
					}
				}
			};

			this.clear = () =>
			{
				this.value = '';
				this.isToday = false;

				if(this._change)
				{
					this._change({ event: null, value: '' });
				}
			};

			this.pickPreset = (event, iso) =>
			{
				if(this.disabled || !this.inRange(iso))
				{
					return;
				}

				this.value = iso;
				this.isToday = iso === this.todayIso;

				if(this._change)
				{
					this._change({ event, value: iso });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div class="field" ot-click="({ event }) => openPicker(event)">
						<i class="icon">calendar_today</i>
						<input
							class="input"
							type="date"
							:value="value"
							:name="name"
							:min="min"
							:max="max"
							:disabled="disabled"
							ot-change="handle"
						/>
						<button
							ot-if="value && !disabled"
							type="button"
							class="action"
							ot-click.stop="clear"
							:ot-tooltip="{ text: 'Clear', position: { x: 'center', y: 'top' } }"
						>
							<i>close</i>
						</button>
					</div>
					<div ot-if="hasPresets" class="presets">
						<button
							ot-for="preset in presets"
							:ot-key="preset.value"
							type="button"
							:class="'preset' + (value === preset.value ? ' active' : '') + (!inRange(preset.value) ? ' disabled' : '')"
							:disabled="!inRange(preset.value) || disabled"
							ot-click="({ event }) => pickPreset(event, preset.value)"
						>
							{{ preset.label }}
						</button>
					</div>
				</div>
			`;
		}
	});
});
