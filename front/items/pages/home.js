pages.Item({
	id: 'home',
	route: '/',
	title: 'OneType Sites',
	grid: {
		template: '"navbar navbar" "rail workspace" "rail status"',
		columns: '52px 1fr',
		rows: '46px 1fr 26px',
		gap: '0'
	},
	areas: {
		navbar: function()
		{
			return `<e-navbar></e-navbar>`;
		},
		rail: function()
		{
			return `<e-bar></e-bar>`;
		},
		workspace: function()
		{
			return `<e-layout></e-layout>`;
		},
		status: function()
		{
			return `<e-status></e-status>`;
		}
	}
});
