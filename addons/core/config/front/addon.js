const config = onetype.Addon('config', (addon) =>
{
	addon.Field('key', {
		type: 'string',
		required: true,
		description: 'Unique config key, one key is one entry in the browser storage.'
	});

	addon.Field('description', {
		type: 'string',
		description: 'What the config entry controls, written as a full sentence.'
	});

	addon.Field('value', {
		type: 'any',
		value: null,
		description: 'Current value of the config entry.'
	});

	addon.Field('config', {
		type: 'object',
		value: {},
		config: {
			type: {
				type: 'string',
				description: 'Type of the value, like string, number, boolean, object or array.'
			},
			value: {
				type: 'any',
				value: null,
				description: 'Default value applied when the entry is missing from the storage.'
			},
			description: {
				type: 'string',
				description: 'What the config entry controls, written as a full sentence.'
			},
			each: {
				type: 'object',
				description: 'Define of one array element when the value is an array.'
			},
			config: {
				type: 'object',
				description: 'Nested shape when the value is an object.'
			}
		},
		description: 'Schema define the value is validated against when the storage is read.'
	});
});
