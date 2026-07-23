platform.collaborators.Fn('find.list', function()
{
    return Object.values(this.Items()).sort((left, right) =>
    {
        return (right.Get('self') - left.Get('self')) || left.Get('name').localeCompare(right.Get('name'));
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
