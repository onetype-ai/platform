onetype.EmitRegister('platform.boot', {
    description: 'Fires once after the front boot middleware chain finishes. Signals that every addon and package has loaded its data and the UI can draw. Listeners react to a fully booted front, they cannot cancel or delay it.'
});
