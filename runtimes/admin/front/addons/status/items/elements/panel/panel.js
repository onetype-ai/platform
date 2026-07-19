elements.ItemAdd({
	id: 'status-panel',
	icon: 'bottom_panel_open',
	name: 'Status Panel',
	description: 'Chrome around the open status tab, title and close button.',
	category: 'Status',
	metadata: { addon: 'ui.status' },
	config: {
		tab: {
			type: 'string',
			value: ''
		}
	},
	render: function()
	{
		this.title = () =>
		{
			const item = ui.status.ItemGet(this.tab);

			return item ? (item.Get('label') || item.Get('id')) : '';
		};

		this.content = () =>
		{
			const item = ui.status.ItemGet(this.tab);

			if(!item || !item.Get('render') || !item.Fn('visible'))
			{
				return document.createComment('');
			}

			return item.Fn('render');
		};

		this.close = () =>
		{
			$ot.ui.layouts.close('status-panel');
		};

		return `
			<div class="box">
				<div class="head">
					<div class="title">{{ title() }}</div>
					<div class="close" ot-click="close"><i>close</i></div>
				</div>
				<div ot-node="content()" :ot-key="tab"></div>
			</div>
		`;
	}
});
