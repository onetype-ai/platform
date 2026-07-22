onetype.AddonReady('commands', (commands) =>
{
	commands.Fn('expose', 'commands:run', '/api/commands/run');
});
