onetype.EmitRegister('platform.settings.ready', {
    description: 'Fired once on boot after persisted settings are restored from config. Anything that depends on persisted settings restores here, not on @document.ready.',
    addon: 'platform.settings'
});
