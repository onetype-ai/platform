elements.ItemAdd({
	id: 'layout',
	icon: 'layout',
	name: 'Layout',
	description: 'Workspace shell with top, left, right, bottom and center slots.',
	category: 'Layout',
	metadata: { addon: 'ui.layouts' },
	config: {
		zone: {
			type: 'string',
			value: 'root'
		}
	},
	render: function()
	{
		this.slots = ui.layouts.Fn('slots', this.zone);

		const refresh = () =>
		{
			this.slots = ui.layouts.Fn('slots', this.zone);
		};

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'ui.layouts' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'ui.layouts' && refresh());

		this.On('ui.layouts.open', refresh);
		this.On('ui.layouts.close', refresh);
		this.On('ui.layouts.data', refresh);
		this.On('ui.apps.open', refresh);
		this.On('ui.apps.close', refresh);
		this.On('ui.modes.switch', refresh);
		this.On('ui.screens.open', refresh);
		this.On('ui.screens.close', refresh);

		this.render = (item) =>
		{
			return ui.layouts.ItemGet(item.id).Fn('render');
		};

		this.key = (item) =>
		{
			return item.id;
		};

		return `
			<div :class="'box ' + zone">
				<div ot-if="slots.left.length" class="slot left">
					<div ot-for="item in slots.left" ot-node="render(item)" :ot-key="key(item)"></div>
				</div>
				<div class="middle">
					<div ot-if="slots.top.length" class="slot top">
						<div ot-for="item in slots.top" ot-node="render(item)" :ot-key="key(item)"></div>
					</div>
					<div class="slot center">
						<div ot-for="item in slots.center" ot-node="render(item)" :ot-key="key(item)"></div>
					</div>
					<div ot-if="slots.bottom.length" class="slot bottom">
						<div ot-for="item in slots.bottom" ot-node="render(item)" :ot-key="key(item)"></div>
					</div>
				</div>
				<div ot-if="slots.right.length" class="slot right">
					<div ot-for="item in slots.right" ot-node="render(item)" :ot-key="key(item)"></div>
				</div>
			</div>
		`;
	}
});
