commands.Item({
	id: 'ui:canvas:pulse',
	exposed: true,
	description: 'Send a pulse along the connection line between two linked canvas items. A dot travels the line and the line lights up, making live activity visible on the canvas.',
	metadata: { addon: 'ui.canvas' },
	in: {
		from: {
			type: 'string',
			required: true,
			description: 'ID of the item the pulse starts from.'
		},
		to: {
			type: 'string',
			required: true,
			description: 'ID of the item the pulse travels to.'
		},
		color: {
			type: 'string',
			default: '',
			description: 'Pulse color token, one of brand, blue, red, orange, green. Empty inherits the line color.'
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

		if(!source.Get('links').find((link) => link.to === properties.to))
		{
			return resolve(null, 'Canvas items ' + properties.from + ' and ' + properties.to + ' are not linked.', 400);
		}

		onetype.Emit('ui.canvas.pulse', { from: properties.from, to: properties.to, color: properties.color });

		resolve({ from: properties.from, to: properties.to }, 'Pulse sent from ' + properties.from + ' to ' + properties.to + '.');
	}
});
