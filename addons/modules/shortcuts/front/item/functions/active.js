shortcuts.Fn('item.active', function(item, event)
{
    if(!item.Fn('enabled'))
    {
        return false;
    }

    const condition = item.Get('condition');

    if(condition.app.length && !condition.app.includes(admin.apps.active()?.Get('id')))
    {
        return false;
    }

    if(condition.mode.length && !condition.mode.includes(admin.modes.active()?.Get('id')))
    {
        return false;
    }

    if(condition.user && !$ot.get('user'))
    {
        return false;
    }

    /* @todo permission check — wire once permissions has/grant API exists */

    if(condition.callback && condition.callback.call({}, item, event) === false)
    {
        return false;
    }

    return true;
});
