onetype.MiddlewareRegister('platform.boot', {
    description: 'Runs once on server start before the http server opens, addons and packages intercept it to load their data. Each interceptor awaits context.next().',
    addon: 'platform'
});
