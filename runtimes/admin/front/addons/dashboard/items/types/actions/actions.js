ui.dashboard.types.Item({
	id: 'actions',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				actions: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							icon: { type: 'string', description: 'Leading Material Symbols icon.' },
							label: { type: 'string', description: 'Action title.' },
							description: { type: 'string', description: 'Muted text under the label.' },
							hint: { type: 'string', description: 'Short badge on the right, like a count or a shortcut.' },
							color: { type: 'string', description: 'Accent color name. Empty uses the widget accent.' },
							disabled: { type: 'boolean', value: false, description: 'Dims the action and blocks the click.' },
							onClick: { type: 'function', description: 'Called with the action on click.' }
						}
					},
					description: 'Actions top to bottom.'
				}
			},
			description: 'Actions data.'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			this.list = this.payload.actions.map((action) =>
			{
				return { ...action, color: action.color ? action.color : (this.color ? this.color : 'brand') };
			});
		});

		this.run = (action) =>
		{
			return ({ event }) => action.onClick && action.onClick(action, event);
		};

		return `
			<div class="ot-flex-vertical ot-gap-s">
				<div ot-if="!list.length" class="ot-text-muted">No actions</div>
				<div ot-for="action in list" :ot-key="action.label">
					<e-cards-action
						:icon="action.icon"
						:label="action.label"
						:description="action.description"
						:hint="action.hint"
						:color="action.color"
						:is-disabled="action.disabled"
						:_click="run(action)"
					></e-cards-action>
				</div>
			</div>
		`;
	}
});
