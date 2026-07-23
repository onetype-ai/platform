onetype.EmitRegister('platform.reload', {
    description: 'Fires once the reload is decided, moments before the process exits. Listeners have a breath to flush, they cannot cancel.',
    addon: 'platform'
});
