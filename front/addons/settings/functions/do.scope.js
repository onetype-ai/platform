platform.settings.Fn('do.scope', function(definition)
{
    const scopes = this.StoreGet('scopes') || {};

    scopes[definition.id] = definition;

    this.StoreSet('scopes', scopes);

    onetype.Emit('platform.settings.scope', { id: definition.id });

    return definition;
});
