onetype.MiddlewareRegister('platform.reload', {
	description: 'Runs before the front asks the platform to restart. Interceptors persist what must not be lost or set cancel to stop the reload.',
	config: {
		cancel: {
			type: 'boolean',
			description: 'Set true to stop the reload.'
		}
	}
});
