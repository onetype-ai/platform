elements.ItemAdd({
	id: 'elements-browse',
	icon: 'widgets',
	name: 'Elements Browse',
	description: 'Browse and pick elements by category with previews.',
	category: 'Editor',
	author: 'OneType',
	config: {
		_pick: {
			type: 'function'
		}
	},
	render: function()
	{
		this.category = null;
		this.categories = [];
		this.items = [];
		this.loading = true;

		$ot.command('se:categories:list', {}, true).then(result =>
		{
			this.categories = result.data.categories;

			if(this.categories.length)
			{
				this.tab(this.categories[0].id);
			}

			this.loading = false;
		});

		this.tab = (id) =>
		{
			this.category = id;
			this.items = [];

			$ot.command('se:catalog:list', { category_id: id }, true).then(result =>
			{
				this.items = result.data.elements;
			});
		};

		this.preview = (slug) =>
		{
			return 'https://preview.elements.onetype.ai/' + slug + '?single:boolean=true';
		};

		this.params = (item) =>
		{
			if(!item.config)
			{
				return 0;
			}

			return Object.keys(item.config).filter(key => !key.startsWith('_')).length;
		};

		this.select = (item) =>
		{
			if(this._pick)
			{
				this._pick(item);
			}

			$ot.modal.close();
		};

		return `
			<div class="holder">
				<div class="header">
					<span class="title">Elements</span>
					<a class="powered" href="https://elements.onetype.ai" target="_blank">Powered by elements.onetype.ai</a>
				</div>
				<div class="body">
					<div class="sidebar ot-scrollbar">
						<e-status-loading ot-if="loading" :variant="['brand']"></e-status-loading>
						<button ot-for="cat in categories" :class="'tab' + (category === cat.id ? ' active' : '')" ot-click="() => tab(cat.id)">
							<i>{{ cat.icon }}</i>
							<span>{{ cat.name }}</span>
							<span class="count">{{ cat.count }}</span>
						</button>
					</div>
					<div class="grid ot-grid-auto-l ot-scrollbar">
						<div ot-for="item in items" class="card" ot-click="() => select(item)">
							<div class="preview">
								<iframe :src="preview(item.slug)" scrolling="no" class="frame"></iframe>
							</div>
							<div class="info">
								<div class="top">
									<i class="icon">{{ item.icon }}</i>
									<span class="name">{{ item.name }}</span>
								</div>
								<span class="description">{{ item.description }}</span>
								<div class="meta">
									<span class="params" ot-if="params(item)"><i>tune</i> {{ params(item) }} params</span>
								</div>
							</div>
						</div>
						<div ot-if="!loading && !items.length" class="empty">
							<e-status-empty icon="widgets" title="No elements" description="No elements in this category." :variant="['auto']"></e-status-empty>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
