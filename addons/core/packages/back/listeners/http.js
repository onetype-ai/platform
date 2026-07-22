import packages from '#packages/addon.js';

onetype.MiddlewareIntercept('servers.http.request', async (middleware) =>
{
    const http = middleware.value;

    const list = {};

    for(const item of Object.values(packages.Items()))
    {
        list[item.Get('slug')] = item.Get(['slug', 'name', 'version', 'description', 'icon', 'color', 'core', 'depends', 'bundle', 'runtimes', 'status', 'message', 'permissions', 'features', 'config', 'limits']);
    }

    http.state.packages = list;

    await middleware.next();
});
