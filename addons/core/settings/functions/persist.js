$ot.modules.settings.Fn('persist', function()
{
    if(onetype.iframe)
    {
        return {};
    }

    const data = {};

    Object.values(this.Items()).forEach((item) =>
    {
        if(item.Get('storage') === 'local')
        {
            data[item.Get('id')] = item.Get('value');

            $ot.system.persistence.set('settings.' + item.Get('id'), item.Get('value'));
        }
    });

    return data;
});
