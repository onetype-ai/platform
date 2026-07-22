onetype.AddonReady('commands', (commands) =>
{
	commands.Item({
		id: 'collaborators:join',
		metadata: { addon: 'collaborators' },
		exposed: true,
		description: 'Join the editor as a collaborator. The avatar appears in the navbar and a named cursor follows the collaborator around, except for the local session.',
		in: {
			id: {
				type: 'string',
				required: true,
				description: 'Unique collaborator id.'
			},
			name: {
				type: 'string',
				required: true,
				description: 'Display name shown on the avatar and next to the cursor.'
			},
			color: {
				type: 'string',
				value: '',
				description: 'Color token, one of brand, blue, red, orange, green. Empty picks the next free color.'
			},
			type: {
				type: 'string',
				value: 'user',
				description: 'user is a person, agent is an AI assistant.'
			},
			self: {
				type: 'boolean',
				value: false,
				description: 'Marks the local session. The own cursor is never drawn.'
			}
		},
		out: {
			id: {
				type: 'string',
				description: 'ID of the collaborator that joined.'
			},
			color: {
				type: 'string',
				description: 'Color token the collaborator received.'
			}
		},
		callback: function(properties, resolve)
		{
			if(collaborators.ItemGet(properties.id))
			{
				return resolve(null, 'Collaborator ' + properties.id + ' already joined.', 400);
			}

			const palette = ['blue', 'green', 'orange', 'red', 'brand'];
			const color = properties.color || palette[Object.keys(collaborators.Items()).length % palette.length];

			collaborators.Item({
				id: properties.id,
				name: properties.name,
				color,
				type: properties.type,
				self: properties.self
			});

			onetype.Emit('platform.collaborators.join', { id: properties.id });

			resolve({ id: properties.id, color }, 'Collaborator ' + properties.name + ' joined the editor.');
		}
	});
});
