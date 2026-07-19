onetype.MiddlewareRegister('ui.layouts.close', {
	description: 'Runs before a layout item closes, so addons can inspect, rewrite or cancel the request. Each interceptor receives a context whose value holds the close properties and a cancel flag, and must call await context.next(). Set value.cancel to true to stop the close, or mutate value.properties to change what closes.',
	config: {
		properties: {
			type: 'object',
			config: {
				id: {
					type: 'string',
					description: 'ID of the layout item to close.'
				}
			},
			description: 'The close request, the same properties passed to the ui:layouts:close command. Mutate to change what closes.'
		},
		cancel: {
			type: 'boolean',
			value: false,
			description: 'Set to true to cancel the close. The command resolves without changing the item.'
		}
	}
});
