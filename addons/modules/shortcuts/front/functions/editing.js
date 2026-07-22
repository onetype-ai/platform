shortcuts.Fn('editing', function(target)
{
    if(!target)
    {
        return false;
    }

    if(target.isContentEditable)
    {
        return true;
    }

    return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.nodeName);
});
