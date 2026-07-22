onetype.EmitRegister('modules.settings.ready', {
    description: 'Fired once on boot, after persisted settings are restored through system.persistence. Restore anything that depends on persisted settings on this event, not on @document.ready, the order of ready listeners is not guaranteed.',
    metadata: { addon: 'modules.settings' }
});
