packages.FnExpose('one', function(slug, api = false)
{
    if(api)
    {
        return $ot.command('packages:one', { slug }, true);
    }

    return Object.values(this.Items()).find((item) => item.Get('slug') === slug);
});
