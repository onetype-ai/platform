onetype.EmitRegister('ui.layouts.close', {
	description: 'Fired after layout items close. Carries only the ids that actually closed.',
	metadata: { addon: 'ui.layouts' },
	config: {
		ids: {
			type: 'array',
			each: { type: 'string' },
			description: 'IDs of the layout items that closed.'
		}
	}
});
