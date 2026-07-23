onetype.EmitRegister('platform.boot', {
    description: 'Fires once after the boot middleware chain finishes and before the http server opens, every package and addon has loaded its data by then.',
    addon: 'platform'
});
