ui.dashboard.types.Item({
	id: 'gauge',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				value: { type: 'number', value: 0, description: 'Current value.' },
				min: { type: 'number', value: 0, description: 'Range start.' },
				max: { type: 'number', value: 100, description: 'Range end.' },
				display: { type: 'string', description: 'Text shown in the center. Empty shows the value.' },
				caption: { type: 'string', description: 'Muted caption under the value.' },
				color: { type: 'string', description: 'Arc color name. Empty uses the widget accent.' }
			},
			description: 'Gauge data.'
		}
	},
	render: function()
	{
		return `<e-charts-gauge :background="0" :value="payload.value" :min="payload.min" :max="payload.max" :display="payload.display" :caption="payload.caption" :color="payload.color ? payload.color : (color ? color : 'brand')"></e-charts-gauge>`;
	}
});
