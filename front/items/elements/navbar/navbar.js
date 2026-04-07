elements.ItemAdd({
	id: 'navbar',
	icon: 'menu',
	name: 'Navbar',
	description: 'App navbar with navigation items.',
	category: 'App',
	author: 'OneType',
	render: function()
	{
		this.logo = 'https://images.onetype.ai/94f79732-c955-4549-a4d3-11c841964800/public';
		this.items = [
			{ icon: 'language', label: 'Sites', href: '/', match: ['/'], position: 'left' },
			{ icon: 'palette', label: 'Themes', href: '/themes', match: ['/themes'], position: 'left' },
			this.state.user
				? { icon: 'logout', label: 'Sign Out', href: 'https://auth.onetype.ai/logout?return=https://sites.onetype.ai', position: 'right' }
				: { icon: 'login', label: 'Sign In', href: 'https://auth.onetype.ai?return=https://sites.onetype.ai', position: 'right' }
		];

		return `<e-navigation-navbar :logo="logo" :items="items"></e-navigation-navbar>`;
	}
});
