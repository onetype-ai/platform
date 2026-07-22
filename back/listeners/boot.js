import platform from '#platform/addon.js';

onetype.EmitOn('platform.boot', () =>
{
    platform.Fn('author');
});
