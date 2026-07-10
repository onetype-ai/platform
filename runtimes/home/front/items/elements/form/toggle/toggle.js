onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-toggle',
		icon: 'toggle_on',
		name: 'Toggle',
		description: 'On and off switch with label, description and accent colors.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			label: {
				type: 'string',
				value: 'Public workspace',
				description: 'Toggle label.'
			},
			description: {
				type: 'string',
				value: 'Anyone with the link can view.',
				description: 'Helper text below the label.'
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
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the active track.'
			},
			disabled: {
				type: 'boolean',
				value: false,
				description: 'Disabled state.'
			},
			_change: {
				type: 'function',
				description: 'Called with { event, value } when the state changes.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.hasInfo = !!this.label || !!this.description;
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.color];

				if(this.value)
				{
					list.push('active');
				}

				if(this.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.toggle = ({ event }) =>
			{
				event.preventDefault();

				if(this.disabled)
				{
					return;
				}

				this.value = !this.value;

				if(this._change)
				{
					this._change({ event, value: this.value });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<label :class="classes()" ot-click="toggle">
					<input
						type="checkbox"
						:name="name"
						:checked="value"
						:disabled="disabled"
					/>
					<span class="track">
						<span class="thumb"></span>
					</span>
					<span ot-if="hasInfo" class="info">
						<span ot-if="label" class="label">{{ label }}</span>
						<span ot-if="description" class="desc">{{ description }}</span>
					</span>
				</label>
			`;
		}
	});
});
