packages.FnExpose('many', function(api = false)
{
    if(api)
    {
        return $ot.command('packages:many', {}, true);
    }

    return Object.values(this.Items());
});
