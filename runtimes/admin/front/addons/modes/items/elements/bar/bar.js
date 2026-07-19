elements.ItemAdd({
	id: 'modes-bar',
	icon: 'layout',
	name: 'Modes Bar',
	description: 'Floating bar to switch modes.',
	category: 'Modes',
	metadata: { addon: 'ui.modes' },
	render: function()
	{
		const refresh = () =>
		{
			const list = ui.modes.Fn('list');

			this.options = list.map((mode) => ({ value: mode.id, icon: mode.icon, tooltip: mode.label }));
			this.value = list.find((mode) => mode.isActive)?.id || null;
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'ui.modes' && refresh());
		this.On('@addon.item.modified', (item) => item.addon.GetName() === 'ui.modes' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'ui.modes' && refresh());

		this.On('ui.modes.switch', refresh);
		this.On('ui.apps.open', refresh);
		this.On('ui.apps.close', refresh);

		this.change = ({ value }) =>
		{
			$ot.ui.modes.switch(value);
		};

		return `
			<div ot-if="options.length" class="holder">
				<e-form-options :value="value" :options="options" :_change="change"></e-form-options>
			</div>
		`;
	}
});
