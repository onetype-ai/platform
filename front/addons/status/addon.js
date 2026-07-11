ui.status = onetype.Addon('ui.status', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique item id.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position inside the side.'
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

	addon.Field('align', {
		type: 'string',
		value: 'left',
		options: ['left', 'right'],
		description: 'Side of the bar the item goes onto.'
	});

	addon.Field('icon', {
		type: 'string',
		description: 'Material Symbols icon name.'
	});

	addon.Field('label', {
		type: 'string',
		description: 'Segment text.'
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
		description: 'Panel content. An item with a render becomes a tab that opens the overlay panel.'
	});
});
