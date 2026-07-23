onetype.AddonReady('platform.config', (config) =>
{
    config.Item({
        id: 'platform.shortcuts.state',
        description: 'Custom key and enabled state per shortcut, keyed by shortcut id. Holds only rebound or toggled shortcuts.',
        value: {},
        config: {
            type: 'object',
            value: {},
            description: 'Custom key and enabled state per shortcut, keyed by shortcut id.'
        }
    });
});
