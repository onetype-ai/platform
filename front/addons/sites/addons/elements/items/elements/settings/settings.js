elements.ItemAdd({
	id: 'sites-elements-settings',
	icon: 'widgets',
	name: 'Element Settings',
	description: 'Settings panel for the active element.',
	category: 'Editor',
	author: 'OneType',
	config: {},
	render: function()
	{
		this.element = null;
		this.schema = null;
		this.sections = [];

		const field = (key, config) =>
		{
			const type = config.type;

			if(type === 'string' && config.options)
			{
				return {
					key,
					label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
					position: 'left',
					element: 'form-select',
					properties: {
						variant: ['bg-3', 'border', 'size-s'],
						options: config.options.map(o => typeof o === 'string' ? { label: o, value: o } : o)
					}
				};
			}

			if(type === 'string')
			{
				return {
					key,
					label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
					position: 'left',
					element: 'form-input',
					properties: { variant: ['bg-3', 'border', 'size-s'] }
				};
			}

			if(type === 'number')
			{
				return {
					key,
					label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
					position: 'left',
					element: 'form-input',
					properties: { type: 'number', variant: ['bg-3', 'border', 'size-s'] }
				};
			}

			if(type === 'boolean')
			{
				return {
					key,
					label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
					position: 'left',
					element: 'form-toggle',
					properties: { variant: ['bg-3', 'size-s'] }
				};
			}

			if(type === 'array' && config.options)
			{
				return {
					key,
					label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
					position: 'left',
					element: 'form-tags',
					properties: { options: config.options, variant: ['bg-3', 'border', 'size-s'] }
				};
			}

			if(type === 'array' && config.each && config.each.type === 'object' && config.each.config)
			{
				const fields = [];

				for(const subkey in config.each.config)
				{
					const sub = config.each.config[subkey];

					if(sub.type === 'string')
					{
						fields.push({ key: subkey, label: subkey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), element: 'form-input', properties: { variant: ['bg-3', 'border', 'size-s'] } });
					}
					else if(sub.type === 'number')
					{
						fields.push({ key: subkey, label: subkey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), element: 'form-input', properties: { type: 'number', variant: ['bg-3', 'border', 'size-s'] } });
					}
					else if(sub.type === 'boolean')
					{
						fields.push({ key: subkey, label: subkey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), element: 'form-toggle', properties: { variant: ['bg-3', 'size-s'] } });
					}
				}

				return {
					key,
					label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
					position: 'top',
					element: 'core-repeater',
					properties: { fields, variant: ['bg-3', 'size-s'] }
				};
			}

			if(type === 'object' && config.config)
			{
				return null;
			}

			return null;
		};

		const build = () =>
		{
			if(!this.schema)
			{
				this.sections = [];
				return;
			}

			const simple = [];
			const complex = [];

			for(const key in this.schema)
			{
				if(key.startsWith('_'))
				{
					continue;
				}

				const result = field(key, this.schema[key]);

				if(!result)
				{
					continue;
				}

				if(result.element === 'core-repeater')
				{
					complex.push(result);
				}
				else
				{
					simple.push(result);
				}
			}

			const sections = [];

			if(simple.length)
			{
				sections.push({ fields: simple });
			}

			for(const item of complex)
			{
				sections.push({ title: item.label, fields: [item] });
			}

			this.sections = sections;
		};

		const load = () =>
		{
			const active = Object.values(sites.elements.Items()).find(item => item.Get('active'));

			if(active)
			{
				this.element = active.data;
				this.schema = active.Get('config');
			}
			else
			{
				this.element = null;
				this.schema = null;
			}

			build();
		};

		const callback = (item) =>
		{
			if(item.addon.GetName() === 'sites.elements')
			{
				load();
			}
		};

		load();

		this.On('@addon.item.added', callback);
		this.On('@addon.item.modified', callback);
		this.On('@addon.item.removed', callback);

		this.values = () =>
		{
			return this.element ? this.element.data : {};
		};

		this.change = ({ key, value }) =>
		{
			if(!this.element)
			{
				return;
			}

			const data = { ...this.element.data, [key]: value };

			sites.elements.Fn('update', this.element.id, { data });
		};

		this.label = () =>
		{
			if(!this.element)
			{
				return '';
			}

			return this.element.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
		};

		return `
			<div class="holder" ot-if="element">
				<div class="title">{{ label() }}</div>
				<e-core-builder :sections="sections" :values="values()" :_change="change"></e-core-builder>
			</div>
			<div class="empty" ot-if="!element">
				<e-status-empty icon="widgets" title="" description="Click an element in the canvas."></e-status-empty>
			</div>
		`;
	}
});
