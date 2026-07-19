onetype.MiddlewareRegister('ui.layouts.open', {
	description: 'Runs before a layout item opens, so addons can inspect, rewrite or cancel the request. Each interceptor receives a context whose value holds the open properties and a cancel flag, and must call await context.next(). Set value.cancel to true to stop the open, or mutate value.properties to change what opens and with which data.',
	config: {
		properties: {
			type: 'object',
			config: {
				id: {
					type: 'string',
					description: 'ID of the layout item to open.'
				},
				data: {
					type: 'object',
					value: {},
					description: 'Prop values passed to the renders.'
				}
			},
			description: 'The open request, the same properties passed to the ui:layouts:open command. Mutate to change what opens.'
		},
		cancel: {
			type: 'boolean',
			value: false,
			description: 'Set to true to cancel the open. The command resolves without changing the item.'
		}
	}
});
