shortcuts.Fn('match', function(key)
{
    return Object.values(this.Items()).filter((item) =>
    {
        return item.Fn('key').toLowerCase() === key;
    }).sort((a, b) => a.Get('order') - b.Get('order'));
});
