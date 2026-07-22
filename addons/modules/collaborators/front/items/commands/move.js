onetype.AddonReady('commands', (commands) =>
{
	commands.Item({
		id: 'collaborators:move',
		metadata: { addon: 'collaborators' },
		exposed: true,
		silent: true,
		description: 'Move the cursor of a collaborator to a viewport position. Fires constantly while a collaborator works, so the terminal skips it.',
		in: {
			id: {
				type: 'string',
				required: true,
				description: 'ID of the collaborator whose cursor moves.'
			},
			x: {
				type: 'number',
				required: true,
				description: 'Horizontal viewport position in pixels.'
			},
			y: {
				type: 'number',
				required: true,
				description: 'Vertical viewport position in pixels.'
			}
		},
		out: {
			id: {
				type: 'string',
				description: 'ID of the collaborator that moved.'
			}
		},
		callback: function(properties, resolve)
		{
			if(!collaborators.ItemGet(properties.id))
			{
				return resolve(null, 'Collaborator ' + properties.id + ' is not in the editor.', 404);
			}

			collaborators.StoreSet('cursor:' + properties.id, { x: properties.x, y: properties.y });

			onetype.Emit('platform.collaborators.move', { id: properties.id, x: properties.x, y: properties.y });

			resolve({ id: properties.id }, 'Collaborator ' + properties.id + ' cursor at ' + properties.x + ', ' + properties.y + '.');
		}
	});
});
