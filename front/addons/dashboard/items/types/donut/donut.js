ui.dashboard.types.Item({
	id: 'donut',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				label: { type: 'string', description: 'Caption under the center total.' },
				segments: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							name: { type: 'string', description: 'Segment name in the legend.' },
							value: { type: 'number', value: 0, description: 'Segment value, summed into the total.' },
							color: { type: 'string', description: 'Segment color name.' }
						}
					},
					description: 'Segments of the ring.'
				}
			},
			description: 'Donut data.'
		}
	},
	render: function()
	{
		return `<e-charts-donut :background="0" :label="payload.label" :segments="payload.segments"></e-charts-donut>`;
	}
});
