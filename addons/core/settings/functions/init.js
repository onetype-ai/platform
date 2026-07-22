$ot.modules.settings.Fn('init', function()
{
    if(onetype.iframe)
    {
        return;
    }

    Object.entries($ot.system.persistence.data).forEach(([key, value]) =>
    {
        if(!key.startsWith('settings.'))
        {
            return;
        }

        const id = key.slice('settings.'.length);

        let item = this.ItemGet(id);

        if(!item)
        {
            item = this.Item({ id });
        }

        item.Set('value', value);

        onetype.Emit('modules.settings.change', { id, value });
    });
});
