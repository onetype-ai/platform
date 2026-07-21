shortcuts.CommandAdd({
	id: 'trigger',
	exposed: true,
	description: 'Run a shortcut by id, the same as pressing its key combination. Emits shortcuts.trigger before the callback executes. Fails when the shortcut does not exist or is disabled.',
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the shortcut to run. Must match a registered shortcut item.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the shortcut that ran.'
		}
	},
	callback: async function(properties, resolve)
	{
		const fail = (message, code) =>
		{
			$ot.float.toast({ title: 'Shortcuts', message, type: 'error' });

			resolve(null, message, code);
		};

		const item = shortcuts.ItemGet(properties.id);

		if(!item)
		{
			return fail('Shortcut ' + properties.id + ' not found.', 404);
		}

		if(!item.Fn('enabled'))
		{
			return fail('Shortcut ' + properties.id + ' is disabled.', 403);
		}

		try
		{
			await shortcuts.trigger(properties.id);

			resolve({ id: properties.id }, 'Shortcut ' + properties.id + ' executed.');
		}
		catch(error)
		{
			fail(error.message, 500);
		}
	}
});
