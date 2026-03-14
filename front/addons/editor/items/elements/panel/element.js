elements.ItemAdd({
	id: 'panel-element',
	icon: 'tune',
	name: 'Panel Element',
	description: 'Config editor for an element based on its schema.',
	category: 'Editor',
	author: 'OneType',
	config: {
		element: {
			type: 'object',
			value: {}
		},
		schema: {
			type: 'object',
			value: {}
		},
		_edit: {
			type: 'function'
		}
	},
	render: function()
	{
		this.fields = () =>
		{
			if(!this.schema)
			{
				return [];
			}

			const result = [];

			for(const key in this.schema)
			{
				if(key.startsWith('_'))
				{
					continue;
				}

				const field = this.schema[key];

				result.push({
					key: key,
					type: field.type,
					value: this.element.config && this.element.config[key] !== undefined ? this.element.config[key] : field.value,
					label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
					options: field.options || null
				});
			}

			return result;
		};

		this.change = (key, value) =>
		{
			if(this._edit && this.element)
			{
				const config = { ...(this.element.config || {}), [key]: value };

				this._edit(this.element.id, 'config', config);
			}
		};

		this.input = (key, { value }) =>
		{
			this.change(key, value);
		};

		this.number = (key, { value }) =>
		{
			this.change(key, parseFloat(value) || 0);
		};

		this.toggle = (key) =>
		{
			const current = this.element.config && this.element.config[key] !== undefined ? this.element.config[key] : this.schema[key].value;

			this.change(key, !current);
		};

		this.option = (key, option) =>
		{
			const current = this.element.config && this.element.config[key] !== undefined ? this.element.config[key] : this.schema[key].value;
			const arr = Array.isArray(current) ? [...current] : [];

			if(arr.includes(option))
			{
				this.change(key, arr.filter(v => v !== option));
			}
			else
			{
				this.change(key, [...arr, option]);
			}
		};

		this.active = (key, option) =>
		{
			const current = this.element.config && this.element.config[key] !== undefined ? this.element.config[key] : this.schema[key].value;

			return Array.isArray(current) && current.includes(option);
		};

		return `
			<div class="holder">
				<div ot-for="field in fields()" class="group">
					<div ot-if="field.type === 'string' && !field.options" class="field">
						<span class="label">{{ field.label }}</span>
						<e-form-input :value="String(field.value || '')" :variant="['bg-2', 'border', 'size-s']" :_change="(data) => input(field.key, data)"></e-form-input>
					</div>
					<div ot-if="field.type === 'number'" class="field">
						<span class="label">{{ field.label }}</span>
						<e-form-input :value="String(field.value || 0)" :variant="['bg-2', 'border', 'size-s']" :_change="(data) => number(field.key, data)"></e-form-input>
					</div>
					<div ot-if="field.type === 'boolean'" class="field row">
						<span class="label">{{ field.label }}</span>
						<e-form-toggle :value="field.value" :variant="['bg-3', 'size-s']" :_change="() => toggle(field.key)"></e-form-toggle>
					</div>
					<div ot-if="field.type === 'array' && field.options" class="field">
						<span class="label">{{ field.label }}</span>
						<div class="tags">
							<button ot-for="opt in field.options" :class="'tag' + (active(field.key, opt) ? ' active' : '')" ot-click="() => option(field.key, opt)">{{ opt }}</button>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
