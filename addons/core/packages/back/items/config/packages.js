import config from '#config/addon.js';

config.Item({
	key: 'packages',
	description: 'Instance state of every package, one entry per slug.',
	value: [],
	config: {
		type: 'array',
		value: [],
		description: 'Instance state of every package, one entry per slug.',
		each: {
			type: 'object',
			description: 'State of one package.',
			config: {
				slug: {
					type: 'string',
					required: true,
					description: 'Slug of the package the entry belongs to.'
				},
				status: {
					type: 'string',
					value: 'enabled',
					options: ['enabled', 'disabled'],
					description: 'Whether the package is active on this instance.'
				},
				version: {
					type: 'string',
					description: 'Version of the package the instance last saw.'
				}
			}
		}
	}
});
