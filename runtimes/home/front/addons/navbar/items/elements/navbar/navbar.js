elements.ItemAdd({
	id: 'navbar',
	icon: 'toolbar',
	name: 'Navbar',
	description: 'Top toolbar rendering the navbar items. Addons inject items.',
	category: 'Navbar',
	metadata: { addon: 'ui.navbar' },
	render: function()
	{
		const refresh = () =>
		{
			this.items = ui.navbar.Fn('list');
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'ui.navbar' && refresh());
		this.On('@addon.item.modified', (item) => item.addon.GetName() === 'ui.navbar' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'ui.navbar' && refresh());

		this.On('ui.navbar.open', refresh);
		this.On('ui.navbar.close', refresh);
		this.On('ui.apps.open', refresh);
		this.On('ui.apps.close', refresh);
		this.On('ui.modes.switch', refresh);
		this.On('projects.open', refresh);
		this.On('projects.close', refresh);

		this.logo = 'https://images.onetype.ai/96752e47-1bea-4313-025c-5b76dc174200/public';

		return `<e-navigation-navbar :logo="logo" :items="items"></e-navigation-navbar>`;
	}
});
