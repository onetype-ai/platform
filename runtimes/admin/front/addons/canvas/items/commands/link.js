commands.Item({
	id: 'ui:canvas:link',
	exposed: true,
	description: 'Draw a connection arrow from one canvas item to another. The link is stored on the source item and survives refreshes.',
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
		},
		label: {
			type: 'string',
			default: '',
			description: 'Text shown on the middle of the line.'
		},
		color: {
			type: 'string',
			default: '',
			description: 'Line color token, one of brand, blue, red, orange, green. Empty uses the default line color.'
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
		const target = ui.canvas.ItemGet(properties.to);

		if(!source)
		{
			return resolve(null, 'Canvas item ' + properties.from + ' does not exist.', 404);
		}

		if(!target)
		{
			return resolve(null, 'Canvas item ' + properties.to + ' does not exist.', 404);
		}

		if(properties.from === properties.to)
		{
			return resolve(null, 'Canvas item ' + properties.from + ' cannot link to itself.', 400);
		}

		const links = source.Get('links');

		if(links.find((link) => link.to === properties.to))
		{
			return resolve(null, 'Canvas items ' + properties.from + ' and ' + properties.to + ' are already linked.', 400);
		}

		source.Set('links', links.concat([{ to: properties.to, label: properties.label, color: properties.color }]), false);

		ui.canvas.Fn('persist');

		onetype.Emit('ui.canvas.link', { from: properties.from, to: properties.to });

		resolve({ from: properties.from, to: properties.to }, 'Canvas item ' + properties.from + ' now links to ' + properties.to + '.');
	}
});
