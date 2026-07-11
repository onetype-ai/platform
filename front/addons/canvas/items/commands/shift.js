commands.Item({
	id: 'ui:canvas:shift',
	exposed: true,
	description: 'Move a set of canvas items by an offset, either a whole group or an explicit list of ids. Every member keeps its relative position. Fails when any member would overlap an item outside the set.',
	metadata: { addon: 'ui.canvas' },
	in: {
		group: {
			type: 'string',
			description: 'ID of the group to move. Provide either group or ids.'
		},
		ids: {
			type: 'array',
			each: { type: 'string' },
			description: 'IDs of the items to move together. Provide either group or ids.'
		},
		dx: {
			type: 'number',
			required: true,
			description: 'Horizontal offset in pixels.'
		},
		dy: {
			type: 'number',
			required: true,
			description: 'Vertical offset in pixels.'
		}
	},
	out: {
		ids: {
			type: 'array',
			each: { type: 'string' },
			description: 'IDs of the items that moved.'
		}
	},
	callback: function(properties, resolve)
	{
		let members;
		let label;

		if(properties.group)
		{
			if(!ui.canvas.Fn('groups')[properties.group])
			{
				return resolve(null, 'Canvas group ' + properties.group + ' not found.', 404);
			}

			members = Object.values(ui.canvas.Items()).filter((item) => item.Get('group') === properties.group);
			label = 'Canvas group ' + properties.group;
		}
		else if(properties.ids && properties.ids.length)
		{
			const missing = properties.ids.find((id) => !ui.canvas.ItemGet(id));

			if(missing)
			{
				return resolve(null, 'Canvas item ' + missing + ' does not exist.', 404);
			}

			members = properties.ids.map((id) => ui.canvas.ItemGet(id));
			label = members.length + ' canvas items';
		}
		else
		{
			return resolve(null, 'Provide a group or a list of ids to shift.', 400);
		}

		if(!members.length)
		{
			return resolve(null, 'Canvas group ' + properties.group + ' has no items.', 400);
		}

		const ids = members.map((item) => item.Get('id'));

		for(const item of members)
		{
			const blocking = ui.canvas.Fn('collides', {
				id: item.Get('id'),
				x: item.Get('x') + properties.dx,
				y: item.Get('y') + properties.dy,
				width: item.Get('width'),
				height: item.Get('height')
			}, ids);

			if(blocking)
			{
				return resolve(null, label + ' would overlap ' + blocking + '.', 400);
			}
		}

		members.forEach((item) =>
		{
			item.Set('x', item.Get('x') + properties.dx, false);
			item.Set('y', item.Get('y') + properties.dy, false);
		});

		ui.canvas.Fn('persist');

		onetype.Emit('ui.canvas.move', { ids });

		resolve({ ids }, label + ' moved by ' + properties.dx + ', ' + properties.dy + '.');
	}
});
