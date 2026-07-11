ui.dashboard.types.Item({
	id: 'bar',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				bars: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							label: { type: 'string', description: 'Category label under the bar.' },
							value: { type: 'number', value: 0, description: 'Bar value, scaled against the largest bar.' },
							color: { type: 'string', description: 'Bar color name. Empty uses the widget accent.' }
						}
					},
					description: 'Bars to draw, left to right.'
				}
			},
			description: 'Bar data.'
		}
	},
	render: function()
	{
		return `<e-charts-bar :bars="payload.bars"></e-charts-bar>`;
	}
});
