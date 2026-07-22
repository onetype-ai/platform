onetype.AddonReady('commands', (commands) =>
{
	commands.Item({
		metadata: { addon: 'platform' },
		id: 'platform:health',
		exposed: true,
		method: 'GET',
		endpoint: '/health',
		out: {
			uptime: ['number', null, true]
		},
		callback: async function(properties, resolve)
		{
			resolve({
				uptime: process.uptime()
			});
		}
	});
});
