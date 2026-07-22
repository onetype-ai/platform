import html from '@onetype/framework/html';

onetype.AddonReady('commands', (commands) =>
{
	commands.Item({
		metadata: { addon: 'platform' },
		id: 'platform:html',
		exposed: true,
		silent: true,
		method: 'GET',
		endpoint: '*',
		type: 'HTML',
		callback: async function(properties, resolve)
		{
			resolve(html.Fn('render', this));
		}
	});
});
