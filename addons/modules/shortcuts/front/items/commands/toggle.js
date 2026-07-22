onetype.AddonReady('commands', (commands) =>
{
	commands.Item({
		id: 'shortcuts:toggle',
		metadata: { addon: 'shortcuts' },
		exposed: true,
		description: 'Enable or disable a shortcut and persist it across reloads. Flips the current state unless enabled is passed explicitly. Emits shortcuts.toggle. Does nothing when the shortcut is already in the requested state.',
		in: {
			id: {
				type: 'string',
				required: true,
				description: 'ID of the shortcut to toggle. Must match a registered shortcut item.'
			},
			enabled: {
				type: 'boolean',
				description: 'Explicit state to set. Omit to flip the current state.'
			}
		},
		out: {
			id: {
				type: 'string',
				description: 'ID of the shortcut.'
			},
			enabled: {
				type: 'boolean',
				description: 'State the shortcut ended up in.'
			}
		},
		callback: function(properties, resolve)
		{
			const item = shortcuts.ItemGet(properties.id);

			if(!item)
			{
				$ot.float.toast({ title: 'Shortcuts', message: 'Shortcut ' + properties.id + ' not found.', type: 'error' });

				return resolve(null, 'Shortcut ' + properties.id + ' not found.', 404);
			}

			const enabled = properties.enabled === undefined ? !item.Fn('enabled') : properties.enabled;

			if(!shortcuts.toggle(properties.id, enabled))
			{
				return resolve({ id: properties.id, enabled }, 'Shortcut ' + properties.id + ' is already ' + (enabled ? 'enabled' : 'disabled') + '.');
			}

			resolve({ id: properties.id, enabled }, 'Shortcut ' + properties.id + ' is now ' + (enabled ? 'enabled' : 'disabled') + '.');
		}
	});
});
