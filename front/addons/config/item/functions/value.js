platform.config.Fn('item.value', function(item)
{
    const data = this.Fn('get.read');

    if(!(item.Get('id') in data))
    {
        return item.Get('value');
    }

    const define = item.Get('config');
    const value = data[item.Get('id')];

    if(!Object.keys(define).length)
    {
        return value;
    }

    try
    {
        return onetype.DataDefineOne(value, define);
    }
    catch(error)
    {
        onetype.Error(400, 'Config value :id: rejected: :reason:', { id: item.Get('id'), reason: error.message });

        return item.Get('value');
    }
});
