pages.Item({
	id: 'not-found',
	route: '/404',
	title: '404 - OneType',
	404: true,
	grid: {
		template: '"navbar navbar" "rail content"',
		columns: '52px 1fr',
		rows: '46px 1fr',
		gap: '0'
	},
	areas: {
		navbar: function()
		{
			return `<e-navbar></e-navbar>`;
		},
		rail: function()
		{
			return `<e-dock-bar></e-dock-bar>`;
		},
		content: function()
		{
			return `<e-status-code></e-status-code>`;
		}
	}
});
