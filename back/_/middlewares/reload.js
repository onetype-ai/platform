onetype.MiddlewareRegister('platform.reload', {
    description: 'Runs before the platform process restarts. Interceptors flush what must not be lost or set cancel to stop the reload.',
    addon: 'platform',
    config: {
        cancel: {
            type: 'boolean',
            description: 'Set true to stop the reload.'
        }
    }
});
