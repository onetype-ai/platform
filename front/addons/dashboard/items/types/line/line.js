ui.dashboard.types.Item({
	id: 'line',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				labels: {
					type: 'array',
					value: [],
					each: { type: 'string' },
					description: 'X axis labels, one per point. Only the first and last are shown.'
				},
				series: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							name: { type: 'string', description: 'Series name shown in the legend.' },
							color: { type: 'string', description: 'Series color name. Empty uses the widget accent.' },
							points: { type: 'array', value: [], each: { type: 'number' }, description: 'Y values, one per label.' }
						}
					},
					description: 'One or more series sharing the same labels.'
				}
			},
			description: 'Line data.'
		}
	},
	render: function()
	{
		return `<e-charts-line :labels="payload.labels" :series="payload.series"></e-charts-line>`;
	}
});
