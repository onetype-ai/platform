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

		const load = () =>
		{
			this.items = !this.page ? [] : Object.values(sites.sections.Items()).filter(item => item.Get('page_id') === this.page).sort((a, b) => a.Get('order') - b.Get('order')).map(item => item.data);
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

		const select = (section) =>
		{
			for(const item of Object.values(sites.sections.Items()))
			{
				if(item.Get('active') && item.Get('id') !== section.id)
				{
					item.Set('active', false);
				}
			}

			const target = sites.sections.ItemGet(section.id);

			if(target)
			{
				target.Set('active', !target.Get('active'));
			}
		};

		const reorder = (section, direction) =>
		{
			const index = this.items.findIndex(s => s.id === section.id);
			const swap = this.items[index + direction];

			if(!swap)
			{
				return;
			}

			sites.sections.Fn('update', section.id, { order: swap.order });
			sites.sections.Fn('update', swap.id, { order: section.order });
		};

		this.toolbar = ({ event }, section, index) =>
		{
			const count = this.items.length;

			$ot.popup(event.target.closest('.section'), function()
			{
				this.toggle = () => select(section);
				this.up = () => reorder(section, -1);
				this.down = () => reorder(section, 1);

				this.del = () =>
				{
					sites.sections.Fn('delete', section.id);
					$ot.popup.close('section-toolbar');
				};

				return `
					<div class="section-toolbar">
						<span class="label">Section {{ ${index} + 1 }}</span>
						<div class="actions">
							<i :class="${section.active} ? 'active' : ''" ot-click="toggle">settings</i>
							<i ot-if="${index} > 0" ot-click="up">arrow_upward</i>
							<i ot-if="${index} < ${count - 1}" ot-click="down">arrow_downward</i>
							<i ot-click="del">delete</i>
						</div>
					</div>
				`;
			}, { id: 'section-toolbar', position: { x: 'center', y: 'center' } });
		};

		this.toolbarClose = ({ event }) =>
		{
			if(event.relatedTarget && event.relatedTarget.closest('.ot-overlay'))
			{
				return;
			}

			$ot.popup.close('section-toolbar');
		};

		this.add = () =>
		{
			sites.sections.Fn('create', this.page);
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
			return 'grid-template-columns:' + section.columns.map(col => col.width).join(' ') + ';gap:' + section.gap + 'px;';
		};

		this.spacing = (value) =>
		{
			return value.top + 'px ' + value.right + 'px ' + value.bottom + 'px ' + value.left + 'px';
		};

		this.background = (section) =>
		{
			return section.background ? 'background:' + section.background : '';
		};

		return `
			<div class="builder">
				<div class="insert" ot-click.stop="add"><i>add</i></div>
				<div ot-for="section, index in items">
					<div :class="'section' + (section.active ? ' active' : '')" ot-mouse-enter="(e) => toolbar(e, section, index)" ot-mouse-leave="toolbarClose">
						<div class="margin" :style="'padding:' + spacing(section.margin)">
							<span ot-if="section.margin.top" class="dimension top">{{ section.margin.top }}</span>
							<span ot-if="section.margin.bottom" class="dimension bottom">{{ section.margin.bottom }}</span>
							<span ot-if="section.margin.left" class="dimension left">{{ section.margin.left }}</span>
							<span ot-if="section.margin.right" class="dimension right">{{ section.margin.right }}</span>
							<div class="padding" :style="'padding:' + spacing(section.padding)">
								<span ot-if="section.padding.top" class="dimension top">{{ section.padding.top }}</span>
								<span ot-if="section.padding.bottom" class="dimension bottom">{{ section.padding.bottom }}</span>
								<span ot-if="section.padding.left" class="dimension left">{{ section.padding.left }}</span>
								<span ot-if="section.padding.right" class="dimension right">{{ section.padding.right }}</span>
								<div class="content" :style="background(section)">
									<div :class="container(section)" :style="grid(section)">
										<div ot-for="col, ci in section.columns" class="column" ot-click.stop="() => pick(section, ci)">
											<span ot-if="col.element" class="element-label">{{ col.element }}</span>
											<i ot-if="!col.element">add</i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="insert" ot-click.stop="add"><i>add</i></div>
				</div>
				<div ot-if="!items.length" class="empty" ot-click="add">
					<i>add</i>
					<span>Add your first section</span>
				</div>
			</div>
		`;
	}
});
