commands.Item({
	id: 'ui:canvas:unlink',
	exposed: true,
	description: 'Remove the connection arrow between two canvas items.',
	metadata: { addon: 'ui.canvas' },
	in: {
		from: {
			type: 'string',
			required: true,
			description: 'ID of the item the arrow starts from.'
		},
		to: {
			type: 'string',
			required: true,
			description: 'ID of the item the arrow points to.'
		}
	},
	out: {
		from: {
			type: 'string',
			description: 'ID of the source item.'
		},
		to: {
			type: 'string',
			description: 'ID of the target item.'
		}
	},
	callback: function(properties, resolve)
	{
		const source = ui.canvas.ItemGet(properties.from);

		if(!source)
		{
			return resolve(null, 'Canvas item ' + properties.from + ' does not exist.', 404);
		}

		const links = source.Get('links');

		if(!links.find((link) => link.to === properties.to))
		{
			return resolve(null, 'Canvas items ' + properties.from + ' and ' + properties.to + ' are not linked.', 400);
		}

		source.Set('links', links.filter((link) => link.to !== properties.to), false);

		ui.canvas.Fn('persist');

		onetype.Emit('ui.canvas.unlink', { from: properties.from, to: properties.to });

		resolve({ from: properties.from, to: properties.to }, 'Canvas item ' + properties.from + ' no longer links to ' + properties.to + '.');
	}
});
