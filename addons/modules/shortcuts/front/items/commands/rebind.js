shortcuts.CommandAdd({
	id: 'rebind',
	exposed: true,
	description: 'Change the key combination of a shortcut and persist it across reloads. Omit key to restore the default combination and drop the stored override. Emits shortcuts.rebind. Does nothing when the shortcut already uses the requested key.',
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the shortcut to rebind. Must match a registered shortcut item.'
		},
		key: {
			type: 'string',
			description: 'New key combination, like meta+shift+k. Omit to restore the default.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the shortcut.'
		},
		key: {
			type: 'string',
			description: 'Key combination the shortcut listens to now.'
		}
	},
	callback: function(properties, resolve)
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

		let key = properties.key;

		if(key === undefined)
		{
			key = item.Get('key');
		}
		else
		{
			key = key.toLowerCase();

			if(!shortcuts.valid(key))
			{
				return fail('Key ' + key + ' is not a valid combination.', 400);
			}
		}

		if(!shortcuts.rebind(properties.id, key))
		{
			return resolve({ id: properties.id, key }, 'Shortcut ' + properties.id + ' already uses ' + key + '.');
		}

		resolve({ id: properties.id, key }, 'Shortcut ' + properties.id + ' now listens to ' + key + '.');
	}
});
