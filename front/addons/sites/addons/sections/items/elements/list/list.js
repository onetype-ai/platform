elements.ItemAdd({
	id: 'sites-sections-list',
	icon: 'layers',
	name: 'Editor Sections List',
	description: 'Section tree for the layers tab.',
	category: 'Editor',
	author: 'OneType',
	config: {},
	render: function()
	{
		this.sections = [];
		this.page = null;

		const active = () =>
		{
			const items = Object.values(sites.pages.Items());

			for(const item of items)
			{
				if(item.Get('active'))
				{
					return item.data;
				}
			}

			return null;
		};

		const load = () =>
		{
			this.page = active();

			if(!this.page)
			{
				this.sections = [];
				return;
			}

			this.sections = Object.values(sites.sections.Items())
				.filter(item => item.Get('page_id') === this.page.id)
				.sort((a, b) => a.Get('order') - b.Get('order'))
				.map(item => item.data);
		};

		const callback = (item) =>
		{
			const name = item.addon.GetName();

			if(name === 'sites.pages' || name === 'sites.sections')
			{
				load();
			}
		};

		this.On('@addon.item.added', callback);
		this.On('@addon.item.modified', callback);
		this.On('@addon.item.removed', callback);

		load();

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

		this.remove = (section) =>
		{
			sites.sections.Fn('delete', section.id);
		};

		this.create = () =>
		{
			if(this.page)
			{
				sites.sections.Fn('create', this.page.id);
			}
		};

		this.reorder = (section, direction) =>
		{
			const index = this.sections.findIndex(s => s.id === section.id);
			const swap = this.sections[index + direction];

			if(!swap)
			{
				return;
			}

			sites.sections.Fn('update', section.id, { order: swap.order });
			sites.sections.Fn('update', swap.id, { order: section.order });
		};

		this.layout = (section) =>
		{
			return section.columns.join(' ');
		};

		return `
			<div class="tree">
				<div ot-for="section, index in sections" :class="'section' + (section.active ? ' active' : '')" ot-click="() => select(section)">
					<div class="row">
						<i class="icon">view_agenda</i>
						<div class="info">
							<span class="name">Section {{ index + 1 }}</span>
							<span class="detail">{{ layout(section) }}</span>
						</div>
						<div class="actions">
							<i ot-if="index > 0" ot-click.stop="() => reorder(section, -1)">arrow_upward</i>
							<i ot-if="index < sections.length - 1" ot-click.stop="() => reorder(section, 1)">arrow_downward</i>
							<i class="delete" ot-click.stop="() => remove(section)">delete</i>
						</div>
					</div>
				</div>
				<div ot-if="page" class="create" ot-click="create">
					<i>add</i>
					<span>Add Section</span>
				</div>
				<div ot-if="!page" class="empty">
					<span>Select a page</span>
				</div>
			</div>
		`;
	}
});
