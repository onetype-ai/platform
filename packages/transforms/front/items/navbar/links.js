onetype.AddonReady('ui.navbar', (navbar) =>
{
	navbar.ItemsAdd([
		{
			id: 'transforms-catalog',
			order: 1,
			position: 'left',
			icon: 'grid_view',
			name: 'Catalog',
			condition: { app: ['transforms'], mode: ['browse'] }
		},
		{
			id: 'transforms-pricing',
			order: 2,
			position: 'left',
			icon: 'sell',
			name: 'Pricing',
			condition: { app: ['transforms'], mode: ['browse'] }
		},
		{
			id: 'transforms-how',
			order: 3,
			position: 'left',
			icon: 'route',
			name: 'How it Works',
			condition: { app: ['transforms'], mode: ['browse'] }
		},
		{
			id: 'transforms-start',
			order: 4,
			position: 'left',
			icon: 'rocket_launch',
			name: 'Get Started',
			condition: { app: ['transforms'], mode: ['browse'] }
		}
	]);
});
