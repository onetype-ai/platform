config.Fn('write', function()
{
    const data = this.Fn('read');

    for(const item of Object.values(this.Items()))
    {
        data[item.Get('id')] = item.Get('value');
    }

    localStorage.setItem('onetype-config', JSON.stringify(data));
});
