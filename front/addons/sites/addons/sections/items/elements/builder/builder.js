elements.ItemAdd({
	id: 'editor-sections-builder',
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

		this.select = (section) =>
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

		this.add = () =>
		{
			sites.sections.Fn('create', this.page);
		};

		this.remove = (event, section) =>
		{
			event.stopPropagation();
			sites.sections.Fn('delete', section.id);
		};

		this.reorder = (event, section, direction) =>
		{
			event.stopPropagation();

			const index = this.items.findIndex(s => s.id === section.id);
			const swap = this.items[index + direction];

			if(!swap)
			{
				return;
			}

			sites.sections.Fn('update', section.id, { order: swap.order });
			sites.sections.Fn('update', swap.id, { order: section.order });
		};

		this.container = (section) =>
		{
			if(section.container === 'none')
			{
				return 'body';
			}

			return 'body container-' + section.container;
		};

		this.grid = (section) =>
		{
			return 'grid-template-columns:' + section.columns.join(' ') + ';gap:' + section.gap + 'px;';
		};

		this.margin = (section) =>
		{
			return section.margin.top + 'px ' + section.margin.right + 'px ' + section.margin.bottom + 'px ' + section.margin.left + 'px';
		};

		this.padding = (section) =>
		{
			return section.padding.top + 'px ' + section.padding.right + 'px ' + section.padding.bottom + 'px ' + section.padding.left + 'px';
		};

		this.background = (section) =>
		{
			return section.background ? 'background:' + section.background : '';
		};

		return `
			<div class="builder">
				<div class="insert" ot-click.stop="add"><i>add</i></div>
				<div ot-for="section, index in items">
					<div :class="'section' + (section.active ? ' active' : '')">
						<div class="toolbar">
							<span class="label">Section {{ index + 1 }}</span>
							<div class="actions">
								<i :class="section.active ? 'active' : ''" ot-click.stop="() => select(section)">settings</i>
								<i ot-if="index > 0" ot-click="(e) => reorder(e, section, -1)">arrow_upward</i>
								<i ot-if="index < items.length - 1" ot-click="(e) => reorder(e, section, 1)">arrow_downward</i>
								<i ot-click="(e) => remove(e, section)">delete</i>
							</div>
						</div>
						<div class="margin" :style="'padding:' + margin(section)">
							<span ot-if="section.margin.top" class="dimension top">{{ section.margin.top }}</span>
							<span ot-if="section.margin.bottom" class="dimension bottom">{{ section.margin.bottom }}</span>
							<span ot-if="section.margin.left" class="dimension left">{{ section.margin.left }}</span>
							<span ot-if="section.margin.right" class="dimension right">{{ section.margin.right }}</span>
							<div class="padding" :style="'padding:' + padding(section)">
								<span ot-if="section.padding.top" class="dimension top">{{ section.padding.top }}</span>
								<span ot-if="section.padding.bottom" class="dimension bottom">{{ section.padding.bottom }}</span>
								<span ot-if="section.padding.left" class="dimension left">{{ section.padding.left }}</span>
								<span ot-if="section.padding.right" class="dimension right">{{ section.padding.right }}</span>
								<div class="content" :style="background(section)">
									<div :class="container(section)" :style="grid(section)">
										<div ot-for="col in section.columns" class="column">
											<div class="placeholder">
												<i>add</i>
												<span>Drop here</span>
											</div>
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
