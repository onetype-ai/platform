onetype.EmitRegister('ui.layouts.data', {
	description: 'Fired after the global layout data changes. Carries only the values that were passed in, the full data comes from the data function.',
	metadata: { addon: 'ui.layouts' },
	config: {
		values: {
			type: 'object',
			description: 'Values that were merged into the global layout data.'
		}
	}
});
