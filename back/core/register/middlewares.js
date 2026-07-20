import onetype from '@onetype/framework';

onetype.MiddlewareRegister('platform.boot', {
	description: 'Runs once on server start before the http server opens. Addons and packages intercept it to load their data (scan packages, hydrate tables) so the server answers with everything in place. Each interceptor must call await context.next().'
});

onetype.MiddlewareRegister('platform.reload', {
	description: 'Runs before the platform process restarts. Interceptors flush what must not be lost or set cancel to stop the reload.',
	config: {
		cancel: {
			type: 'boolean',
			description: 'Set true to stop the reload.'
		}
	}
});
