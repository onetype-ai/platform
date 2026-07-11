commands.Item({
	id: 'ui:explorer:toggle',
	exposed: true,
	silent: true,
	description: 'Toggle the explorer. Flips the current state through ui:explorer:open or ui:explorer:close.',
	metadata: { addon: 'ui.explorer' },
	in: {},
	out: {
		open: {
			type: 'boolean',
			description: 'Whether the explorer is open now.'
		}
	},
	callback: async function(properties, resolve)
	{
		const open = $ot.ui.navbar.opened()?.Get('id') !== 'explorer';

		await $ot.command(open ? 'ui:explorer:open' : 'ui:explorer:close');

		resolve({ open }, 'Explorer is now ' + (open ? 'open' : 'closed') + '.');
	}
});
