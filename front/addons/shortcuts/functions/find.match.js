platform.shortcuts.Fn('find.match', function(key)
{
    return Object.values(this.Items()).filter((item) =>
    {
        return item.Fn('key').toLowerCase() === key;
    }).sort((left, right) => left.Get('order') - right.Get('order'));
});
