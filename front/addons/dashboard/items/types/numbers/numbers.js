ui.dashboard.types.Item({
	id: 'numbers',
	config: {
		color: {
			type: 'string',
			value: '',
			description: 'Accent color name inherited from the widget.'
		},
		payload: {
			type: 'object',
			value: {},
			config: {
				metrics: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							label: { type: 'string', value: '', description: 'Metric label shown above the value.' },
							value: { type: 'string|number', description: 'The metric value, formatted as it should read.' },
							delta: { type: 'string', value: '', description: 'Change indicator text, like +12% or -3.' },
							direction: { type: 'string', value: 'neutral', options: ['up', 'down', 'neutral'], description: 'Trend direction, colors the delta.' }
						}
					},
					description: 'Metrics to show. One fills the card, several split it into columns.'
				}
			},
			description: 'Numbers data.'
		}
	},
	render: function()
	{
		this.icon = (metric) =>
		{
			return metric.direction === 'up' ? 'trending_up' : metric.direction === 'down' ? 'trending_down' : 'trending_flat';
		};

		return `
			<div :class="color ? 'box ' + color : 'box'">
				<div ot-if="!payload.metrics.length" class="empty">No data</div>
				<div ot-for="metric in payload.metrics" :ot-key="metric.label" class="metric">
					<span ot-if="metric.label" class="label">{{ metric.label }}</span>
					<div class="row">
						<span class="value">{{ metric.value }}</span>
						<span ot-if="metric.delta" :class="'delta ' + metric.direction">
							<i>{{ icon(metric) }}</i>
							<span>{{ metric.delta }}</span>
						</span>
					</div>
				</div>
			</div>
		`;
	}
});
