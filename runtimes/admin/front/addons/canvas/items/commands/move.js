commands.Item({
	id: 'ui:canvas:move',
	exposed: true,
	description: 'Move a canvas item to a new position. Persists the layout and emits ui.canvas.move. Positions apply in the free layout, the stack layout computes its own.',
	metadata: { addon: 'ui.canvas' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the canvas item to move.'
		},
		x: {
			type: 'number',
			required: true,
			description: 'New horizontal position in pixels.'
		},
		y: {
			type: 'number',
			required: true,
			description: 'New vertical position in pixels.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the item that moved.'
		},
		x: {
			type: 'number',
			description: 'Horizontal position the item now holds.'
		},
		y: {
			type: 'number',
			description: 'Vertical position the item now holds.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = ui.canvas.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Canvas item ' + properties.id + ' not found.', 404);
		}

		const blocking = ui.canvas.Fn('collides', { id: properties.id, x: properties.x, y: properties.y, width: item.Get('width'), height: item.Get('height') });

		if(blocking)
		{
			return resolve(null, 'Canvas item ' + properties.id + ' would overlap ' + blocking + ' at ' + properties.x + ', ' + properties.y + '.', 400);
		}

		item.Set('x', properties.x, false);
		item.Set('y', properties.y, false);

		ui.canvas.Fn('persist');

		onetype.Emit('ui.canvas.move', { ids: [properties.id] });

		resolve({ id: properties.id, x: properties.x, y: properties.y }, 'Canvas item ' + properties.id + ' moved to ' + properties.x + ', ' + properties.y + '.');
	}
});
