import packages from '#packages/addon.js';

onetype.MiddlewareIntercept('platform.boot', async (middleware) =>
{
    await packages.Fn('sync');
    await packages.Fn('load');

    await middleware.next();
});
