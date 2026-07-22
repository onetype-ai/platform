const platform = onetype.Addon('platform', (addon) =>
{
    $ot.platform = {};

    $ot.platform.boot = new Promise((resolve) =>
    {
        onetype.EmitOn('onetype.document.ready', async () =>
        {
            await onetype.Middleware('platform.boot');
            await onetype.Emit('platform.boot');

            platform.Fn('author');

            resolve();
        });
    });
});
