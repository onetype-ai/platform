onetype.MiddlewareRegister('platform.boot', {
    description: 'Runs once before the front renders. Addons intercept it to load their data (apps, settings, workspaces) so the UI draws with everything in place. Each interceptor must call await context.next().',
    addon: 'platform'
});
