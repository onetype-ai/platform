elements.ItemAdd({
	id: 'sites-sections-settings',
	icon: 'view_agenda',
	name: 'Section Settings',
	description: 'Settings panel for the active section.',
	category: 'Editor',
	author: 'OneType',
	config: {},
	render: function()
	{
		this.section = null;

		const load = () =>
		{
			const active = Object.values(sites.sections.Items()).find(item => item.Get('active'));

			this.section = active ? active.data : null;
		};

		const callback = (item) =>
		{
			if(item.addon.GetName() === 'sites.sections')
			{
				load();
			}
		};

		load();

		this.On('@addon.item.added', callback);
		this.On('@addon.item.modified', callback);
		this.On('@addon.item.removed', callback);

		this.layout = () =>
		{
			if(!this.section)
			{
				return '';
			}

			return this.section.columns.map(col => col.width).join(' ');
		};

		this.values = () =>
		{
			if(!this.section)
			{
				return {};
			}

			const p = this.section.padding || {};
			const m = this.section.margin || {};
			const b = this.section.border || {};

			return {
				...this.section,
				layout: this.layout(),
				'padding.top': String(p.top || 0),
				'padding.right': String(p.right || 0),
				'padding.bottom': String(p.bottom || 0),
				'padding.left': String(p.left || 0),
				'margin.top': String(m.top || 0),
				'margin.bottom': String(m.bottom || 0),
				'border.width': b.width || 0,
				'border.color': b.color || '',
				'border.radius': b.radius || 0
			};
		};

		this.sections = [
			{
				fields: [
					{
						key: 'layout',
						label: 'Layout',
						description: 'Column widths, e.g. 1fr 1fr or 2fr 1fr',
						position: 'top',
						element: 'form-input',
						properties: { placeholder: '1fr', variant: ['bg-3', 'border', 'size-s'] }
					},
					{
						key: 'container',
						label: 'Container',
						position: 'left',
						element: 'form-select',
						properties: {
							variant: ['bg-3', 'border', 'size-s'],
							options: [
								{ label: 'None', value: 'none' },
								{ label: 'Small', value: 's' },
								{ label: 'Medium', value: 'm' },
								{ label: 'Large', value: 'l' },
								{ label: 'Full', value: 'full' }
							]
						}
					},
					{
						key: 'gap',
						label: 'Gap',
						position: 'left',
						element: 'form-slider',
						properties: { min: 0, max: 64, step: 4, variant: ['brand', 'size-s'] }
					}
				]
			},
			{
				title: 'Padding',
				fields: [
					{ key: 'padding.top', label: 'Top', position: 'left', element: 'form-input', properties: { type: 'number', variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'padding.right', label: 'Right', position: 'left', element: 'form-input', properties: { type: 'number', variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'padding.bottom', label: 'Bottom', position: 'left', element: 'form-input', properties: { type: 'number', variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'padding.left', label: 'Left', position: 'left', element: 'form-input', properties: { type: 'number', variant: ['bg-3', 'border', 'size-s'] } }
				]
			},
			{
				title: 'Margin',
				fields: [
					{ key: 'margin.top', label: 'Top', position: 'left', element: 'form-input', properties: { type: 'number', variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'margin.bottom', label: 'Bottom', position: 'left', element: 'form-input', properties: { type: 'number', variant: ['bg-3', 'border', 'size-s'] } }
				]
			},
			{
				title: 'Background',
				fields: [
					{
						key: 'background',
						label: 'Color',
						position: 'left',
						element: 'form-color',
						properties: { variant: ['bg-3', 'border', 'size-s'] }
					}
				]
			},
			{
				title: 'Border',
				collapsed: true,
				fields: [
					{ key: 'border.width', label: 'Width', position: 'left', element: 'form-slider', properties: { min: 0, max: 8, step: 1, variant: ['brand', 'size-s'] } },
					{ key: 'border.color', label: 'Color', position: 'left', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'border.radius', label: 'Radius', position: 'left', element: 'form-slider', properties: { min: 0, max: 32, step: 2, variant: ['brand', 'size-s'] } }
				]
			}
		];

		this.change = ({ key, value }) =>
		{
			if(!this.section)
			{
				return;
			}

			if(key === 'layout')
			{
				const widths = value.trim().split(/\s+/).filter(Boolean);
				const columns = widths.map(width => ({ width, element: null, data: {} }));
				const existing = this.section.columns;

				for(let i = 0; i < columns.length; i++)
				{
					if(existing[i])
					{
						columns[i].element = existing[i].element;
						columns[i].data = existing[i].data;
					}
				}

				sites.sections.Fn('update', this.section.id, { columns });
				return;
			}

			if(key.includes('.'))
			{
				const [parent, child] = key.split('.');
				const current = { ...this.section[parent] };

				current[child] = child === 'color' ? value : +value;
				sites.sections.Fn('update', this.section.id, { [parent]: current });
				return;
			}

			sites.sections.Fn('update', this.section.id, { [key]: value });
		};

		return `
			<div class="holder" ot-if="section">
				<e-core-builder :sections="sections" :values="values()" :_change="change"></e-core-builder>
			</div>
			<div class="empty" ot-if="!section">
				<e-status-empty icon="view_agenda" title="" description="Click a section in the canvas."></e-status-empty>
			</div>
		`;
	}
});
