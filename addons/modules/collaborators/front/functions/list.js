collaborators.Fn('list', function()
{
    return Object.values(this.Items()).sort((a, b) =>
    {
        return (b.Get('self') - a.Get('self')) || a.Get('name').localeCompare(b.Get('name'));
    }).map((item) =>
    {
        return {
            id: item.Get('id'),
            name: item.Get('name'),
            color: item.Get('color'),
            type: item.Get('type'),
            self: item.Get('self')
        };
    });
});
