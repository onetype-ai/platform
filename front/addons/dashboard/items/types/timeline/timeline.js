ui.dashboard.types.Item({
	id: 'timeline',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				events: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							icon: { type: 'string', description: 'Node icon.' },
							title: { type: 'string', description: 'Event title.' },
							detail: { type: 'string', description: 'Muted text under the title.' },
							time: { type: 'string', description: 'Right aligned time label.' },
							badge: { type: 'string', description: 'Small chip next to the title.' },
							color: { type: 'string', description: 'Accent color name. Empty uses the widget accent.' },
							onClick: { type: 'function', description: 'Called with the event on click.' }
						}
					},
					description: 'Events top to bottom, newest first.'
				}
			},
			description: 'Timeline data.'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			this.list = this.payload.events.map((event) =>
			{
				return { ...event, color: event.color ? event.color : (this.color ? this.color : 'brand') };
			});
		});

		return `<e-data-timeline :background="0" :events="list"></e-data-timeline>`;
	}
});
