elements.ItemAdd({
	id: 'sites-sections-builder',
	icon: 'view_agenda',
	name: 'Sections Builder',
	description: 'Visual page builder with sections and column layouts.',
	category: 'Editor',
	author: 'OneType',
	config: {
		page: ['string'],
	},
	render: function()
	{
		this.items = [];
		this.active = null;

		const load = () =>
		{
			this.items = !this.page ? [] : Object.values(sites.sections.Items()).filter(item => item.Get('page_id') === this.page).sort((a, b) => a.Get('order') - b.Get('order')).map(item => item.data);
			this.active = this.items.find(s => s.active)?.id || null;
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

		const toolbar = (target, section, index) =>
		{
			const page = this.page;
			const count = this.items.length;
			const canUp = index > 0;
			const canDown = index < count - 1;
			const id = section.id;
			const order = section.order;

			const actions = {
				above: () => sites.sections.Fn('create', page, Math.max(0, order - 1)),
				below: () => sites.sections.Fn('create', page, order + 1),
				up: () =>
				{
					const swap = this.items[index - 1];

					if(swap)
					{
						sites.sections.Fn('update', id, { order: swap.order });
						sites.sections.Fn('update', swap.id, { order: order });
					}
				},
				down: () =>
				{
					const swap = this.items[index + 1];

					if(swap)
					{
						sites.sections.Fn('update', id, { order: swap.order });
						sites.sections.Fn('update', swap.id, { order: order });
					}
				},
				del: () =>
				{
					sites.sections.Fn('delete', id);
					$ot.popup.close('section-toolbar');
				}
			};

			$ot.popup(target, function()
			{
				this.above = actions.above;
				this.below = actions.below;
				this.up = actions.up;
				this.down = actions.down;
				this.del = actions.del;
				this.canUp = canUp;
				this.canDown = canDown;

				return `
					<div class="section-toolbar">
						<button ot-tooltip="Add above" ot-click.stop="above"><i>vertical_align_top</i></button>
						<button ot-tooltip="Add below" ot-click.stop="below"><i>vertical_align_bottom</i></button>
						<span class="divider"></span>
						<button ot-if="canUp" ot-tooltip="Move up" ot-click.stop="up"><i>arrow_upward</i></button>
						<button ot-if="canDown" ot-tooltip="Move down" ot-click.stop="down"><i>arrow_downward</i></button>
						<span ot-if="canUp || canDown" class="divider"></span>
						<button class="danger" ot-tooltip="Delete" ot-click.stop="del"><i>delete</i></button>
					</div>
				`;
			}, { id: 'section-toolbar', position: { x: 'center', y: 'top' }, offset: { x: 0, y: -4 }, track: true });
		};

		this.select = ({ event }, section, index) =>
		{
			if(this.active === section.id)
			{
				sites.sections.Fn('deactivate');
				$ot.popup.close('section-toolbar');
				return;
			}

			sites.sections.Fn('activate', section.id);
			toolbar(event.target.closest('.section'), section, index);
		};

		this.deselect = ({ event }) =>
		{
			if(!event.target.closest('.section'))
			{
				sites.sections.Fn('deactivate');
				$ot.popup.close('section-toolbar');
			}
		};

		this.add = () =>
		{
			sites.sections.Fn('create', this.page);
		};

		this.selectElement = ({ event }, section, index, col) =>
		{
			sites.sections.Fn('activate', section.id);
			toolbar(event.target.closest('.section'), section, index);

			const item = Object.values(sites.elements.Items()).find(i => i.Get('slug') === col.element);

			if(item)
			{
				sites.elements.Fn('activate', item.Get('id'));
			}
		};

		this.render = (col) =>
		{
			const item = Object.values(sites.elements.Items()).find(i => i.Get('slug') === col.element);
			const data = item ? item.Get('data') : {};

			return elements.Render(col.element, data).Element;
		};

		this.pick = (section, index) =>
		{
			const pick = async (item) =>
			{
				const element = await sites.elements.Fn('create', item.name, item.slug);

				if(element)
				{
					const columns = [...section.columns];

					columns[index] = { ...columns[index], element: item.slug, data: {} };

					sites.sections.Fn('update', section.id, { columns });
				}
			};

			$ot.modal(function()
			{
				this.pick = pick;

				return `<e-elements-browse :_pick="pick"></e-elements-browse>`;
			});
		};

		this.container = (section) =>
		{
			return section.container === 'none' ? 'body' : 'body container-' + section.container;
		};

		this.grid = (section) =>
		{
			const columns = section.columns.map(col => col.width === '1fr' ? 'minmax(0, 1fr)' : col.width).join(' ');
			return 'grid-template-columns:' + columns + ';gap:' + section.gap + 'px;';
		};

		this.contentStyle = (section) =>
		{
			let style = '';

			if(section.background)
			{
				style += 'background:' + section.background + ';';
			}

			const p = section.padding;

			if(p.top || p.right || p.bottom || p.left)
			{
				style += 'padding:' + p.top + 'px ' + p.right + 'px ' + p.bottom + 'px ' + p.left + 'px;';
			}

			const b = section.border;

			if(b.width)
			{
				style += 'border:' + b.width + 'px solid ' + (b.color || 'var(--ot-bg-2-border)') + ';';
			}

			if(b.radius)
			{
				style += 'border-radius:' + b.radius + 'px;';
			}

			return style;
		};

		this.marginStyle = (section) =>
		{
			const m = section.margin;

			if(m.top || m.bottom)
			{
				return 'margin:' + m.top + 'px 0 ' + m.bottom + 'px 0;';
			}

			return '';
		};

		return `
			<div class="builder" ot-click="deselect">
				<div ot-for="section, index in items">
					<div :class="'section' + (active === section.id ? ' selected' : '')" :style="marginStyle(section)" ot-click.stop="(e) => select(e, section, index)">
						<div class="content" :style="contentStyle(section)">
							<div ot-if="active === section.id" class="guides">
								<div ot-if="section.padding.top" class="guide padding top" :style="'height:' + section.padding.top + 'px'">
									<span>{{ section.padding.top }}</span>
								</div>
								<div ot-if="section.padding.right" class="guide padding right" :style="'width:' + section.padding.right + 'px'">
									<span>{{ section.padding.right }}</span>
								</div>
								<div ot-if="section.padding.bottom" class="guide padding bottom" :style="'height:' + section.padding.bottom + 'px'">
									<span>{{ section.padding.bottom }}</span>
								</div>
								<div ot-if="section.padding.left" class="guide padding left" :style="'width:' + section.padding.left + 'px'">
									<span>{{ section.padding.left }}</span>
								</div>
								<div ot-if="section.margin.top" class="guide margin top" :style="'height:' + section.margin.top + 'px'">
									<span>{{ section.margin.top }}</span>
								</div>
								<div ot-if="section.margin.bottom" class="guide margin bottom" :style="'height:' + section.margin.bottom + 'px'">
									<span>{{ section.margin.bottom }}</span>
								</div>
							</div>
							<div :class="container(section)" :style="grid(section)">
								<div ot-for="col, ci in section.columns" class="column">
									<div ot-if="col.element" class="element" ot-click.stop="(e) => selectElement(e, section, index, col)">
										<div ot-node="render(col)"></div>
									</div>
									<div ot-if="!col.element" class="placeholder" ot-click.stop="() => pick(section, ci)">
										<i>add</i>
										<span>Add element</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<e-status-empty ot-if="!items.length" icon="view_agenda" title="No sections" description="Add your first section." action="Add Section" :_click="add"></e-status-empty>
			</div>
		`;
	}
});
