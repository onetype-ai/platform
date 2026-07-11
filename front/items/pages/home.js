pages.Item({
	id: 'home',
	route: '/*',
	title: 'OneType - Platform',
	grid: {
		template: '"app"',
		columns: '1fr',
		rows: '1fr',
		gap: '0'
	},
	areas: {
		app: function()
		{
			this.ready = false;

			$ot.boot.then(() =>
			{
				this.ready = true;
			});

			return `
				<div ot-if="!ready" style="width: 100%; height: 100%;">
					<e-status-loading></e-status-loading>
				</div>
				<div ot-if="ready" style="display: grid; width: 100%; height: 100%; grid-template-areas: 'navbar navbar' 'rail workspace' 'status status'; grid-template-columns: auto 1fr; grid-template-rows: 46px 1fr 32px;">
					<div style="grid-area: navbar;"><e-navbar></e-navbar></div>
					<div style="grid-area: rail;"><e-dock-bar></e-dock-bar></div>
					<div style="grid-area: workspace; min-width: 0; overflow: hidden;"><e-layout></e-layout></div>
					<div style="grid-area: status;"><e-status></e-status></div>
				</div>
			`;
		}
	}
});
