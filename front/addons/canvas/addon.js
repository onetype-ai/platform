ui.canvas = onetype.Addon('ui.canvas', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique item id.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Stacking order between overlapping items.'
	});

	addon.Field('name', {
		type: 'string',
		value: '',
		description: 'Display name shown when the camera is too far to read the content. Falls back to the id.'
	});

	addon.Field('icon', {
		type: 'string',
		value: '',
		description: 'Material Symbols icon shown next to the name when the camera is far away.'
	});

	addon.Field('active', {
		type: 'boolean',
		value: true,
		description: 'Turns the item off entirely when false.'
	});

	addon.Field('app', {
		type: 'array',
		value: [],
		each: { type: 'string' },
		description: 'App ids the item belongs to. Empty means every app.'
	});

	addon.Field('mode', {
		type: 'array',
		value: [],
		each: { type: 'string' },
		description: 'Mode ids the item belongs to. Empty means every mode.'
	});

	addon.Field('group', {
		type: 'string',
		description: 'Group the item belongs to. Grouped items get a shared region drawn around them.'
	});

	addon.Field('x', {
		type: 'number',
		value: 0,
		description: 'Horizontal position on the canvas, in pixels.'
	});

	addon.Field('y', {
		type: 'number',
		value: 0,
		description: 'Vertical position on the canvas, in pixels.'
	});

	addon.Field('width', {
		type: 'number',
		value: 240,
		description: 'Item width in pixels.'
	});

	addon.Field('height', {
		type: 'number',
		value: 140,
		description: 'Item height in pixels.'
	});

	addon.Field('links', {
		type: 'array',
		value: [],
		each: {
			type: 'object',
			config: {
				to: { type: 'string', required: true, description: 'ID of the item the line connects to.' },
				label: { type: 'string', description: 'Text shown on the middle of the line.' },
				color: { type: 'string', description: 'Line color token, one of brand, blue, red, orange, green.' }
			}
		},
		description: 'Visual connections drawn as arrows from this item to others.'
	});

	addon.Field('config', {
		type: 'object',
		value: {},
		description: 'Prop schema for the render.'
	});

	addon.Field('data', {
		type: 'object',
		value: {},
		description: 'Prop values passed to the render.'
	});

	addon.Field('render', {
		type: 'string|function',
		required: true,
		description: 'Content inside the item card, an HTML string or a render function.'
	});
});
