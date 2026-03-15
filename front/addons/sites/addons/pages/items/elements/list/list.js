elements.ItemAdd({
	id: 'sites-pages-list',
	icon: 'description',
	name: 'Editor Pages List',
	description: 'Page list for the pages tab.',
	category: 'Editor',
	author: 'OneType',
	config: {
		_settings: {
			type: 'function'
		}
	},
	render: function()
	{
		this.pages = [];

		const init = () =>
		{
			this.pages = Object.values(sites.pages.Items()).sort((a, b) => a.Get('order') - b.Get('order')).map((item) => item.data);
		};

		const callback = (item) =>
		{
			if(item.addon.GetName() === 'sites.pages')
			{
				init();
			}
		};

		init();

		this.On('@addon.item.added', callback);
		this.On('@addon.item.modified', callback);
		this.On('@addon.item.removed', callback);

		this.select = (page) =>
		{
			sites.pages.Fn('activate', page.id);
		};

		this.settings = (page) =>
		{
			this._settings && this._settings(page);
		};

		this.classes = (page) =>
		{
			return page.active ? 'row active' : 'row';
		};

		this.create = () =>
		{
			sites.pages.Fn('create');
		};

		return `
			<div class="list">
				<div ot-for="page in pages">
					<div :class="classes(page)" ot-click="select(page)">
						<i class="icon">description</i>
						<div class="info">
							<span class="name">{{ page.title }}</span>
							<span class="route">{{ page.route }}</span>
						</div>
						<i class="action" ot-click.prevent="settings(page)">settings</i>
					</div>
				</div>
				<div class="create" ot-click="create">
					<i>add</i>
					<span>Create Page</span>
				</div>
			</div>
		`;
	}
});
