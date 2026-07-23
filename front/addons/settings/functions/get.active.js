platform.settings.Fn('get.active', function(id)
{
    const scope = (this.StoreGet('scopes') || {})[id];

    return scope && scope.active ? scope.active() : null;
});
