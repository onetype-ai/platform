shortcuts.FnExpose('trigger', async function(id)
{
    const item = this.ItemGet(id);

    onetype.Emit('platform.shortcuts.trigger', { id: item.Get('id'), key: item.Fn('key') });

    await item.Get('callback')();
});
