import onetype from '@onetype/framework';

onetype.MiddlewareRegister('boot', {
	description: 'Runs once on server start before the http server opens. Addons and packages intercept it to load their data (scan packages, hydrate tables) so the server answers with everything in place. Each interceptor must call await context.next().'
});
