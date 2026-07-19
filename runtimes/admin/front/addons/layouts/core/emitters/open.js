onetype.EmitRegister('ui.layouts.open', {
	description: 'Fired after layout items open or receive new data. Carries only the ids that actually changed.',
	metadata: { addon: 'ui.layouts' },
	config: {
		ids: {
			type: 'array',
			each: { type: 'string' },
			description: 'IDs of the layout items that opened.'
		}
	}
});
