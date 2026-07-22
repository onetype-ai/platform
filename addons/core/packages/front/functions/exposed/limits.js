packages.FnExpose('limits', function(slug)
{
    return this.one(slug)?.Get('limits');
});
