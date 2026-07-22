packages.FnExpose('enable', async function(slug)
{
    const response = await $ot.command('packages:enable', { slug }, true);

    if(response.code === 200)
    {
        onetype.Emit('platform.packages.enable', { slug: response.data.slug });
    }

    return response;
});
