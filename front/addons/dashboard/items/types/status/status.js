ui.dashboard.types.Item({
	id: 'status',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				items: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							label: { type: 'string', description: 'Service name.' },
							sublabel: { type: 'string', description: 'Muted text under the name.' },
							value: { type: 'string|number', description: 'Trailing value, like latency.' },
							status: { type: 'string', value: 'idle', options: ['up', 'warn', 'down', 'idle'], description: 'Current state of the service.' },
							history: { type: 'array', value: [], each: { type: 'string', options: ['up', 'warn', 'down'], description: 'State of a single tick.' }, description: 'Uptime history ticks, oldest first.' }
						}
					},
					description: 'Services top to bottom.'
				}
			},
			description: 'Status data.'
		}
	},
	render: function()
	{
		return `<e-data-status :items="payload.items" :banner="false"></e-data-status>`;
	}
});
