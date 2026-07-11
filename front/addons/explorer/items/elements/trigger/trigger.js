elements.ItemAdd({
	id: 'explorer-trigger',
	icon: 'search',
	name: 'Explorer Trigger',
	description: 'Search pill in the navbar that opens the explorer.',
	category: 'Explorer',
	metadata: { addon: 'ui.explorer' },
	config: {
		background: {
			type: 'number',
			value: 1,
			options: [1, 2, 3],
			description: 'Background depth of the pill.'
		}
	},
	render: function()
	{
		this.open = () =>
		{
			$ot.ui.explorer.open();
		};

		return `
			<div :class="'box bg-' + background" ot-click="open">
				<i>keyboard_command_key</i>
				<span>Search...</span>
			</div>
		`;
	}
});
