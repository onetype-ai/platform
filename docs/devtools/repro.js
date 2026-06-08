// Simulate a fresh user who lands with documentation as the persisted active app,
// then reloads. The "first click disappears" bug was reported right after load.
// Set persisted state to documentation + clear modes, then we will reload separately.

const settings = onetype.Addon('settings');

settings.Fn('set', 'apps.active', 'documentation');
settings.Fn('set', 'modes.active', {});

// also clear the layouts.state so restore starts clean
settings.Fn('set', 'layouts.state', {});

return 'persisted apps.active=documentation, modes cleared. Now reload.';
