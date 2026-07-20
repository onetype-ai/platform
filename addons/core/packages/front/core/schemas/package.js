onetype.DataSchema('platform.package', {
	slug: {
		type: 'string',
		required: true,
		description: 'Stable text key from the manifest, like hello or builder. Packages are addressed by slug.'
	},
	name: {
		type: 'string',
		required: true,
		description: 'Package name shown in the catalog and on the rail.'
	},
	version: {
		type: 'string',
		required: true,
		description: 'Semver version read from the manifest on disk.'
	},
	description: {
		type: 'string',
		description: 'Short one line description of what the package does.'
	},
	icon: {
		type: 'string',
		description: 'Material Symbols icon name.'
	},
	color: {
		type: 'string',
		description: 'Accent color as a hex or rgba string.'
	},
	permissions: {
		type: 'array',
		value: [],
		required: true,
		each: {
			type: 'string',
			description: 'A single permission id the package requests, like database or zones:canvas.'
		},
		description: 'Permissions the package requests, shown to the user before install.'
	},
	limits: {
		type: 'object',
		value: {},
		required: true,
		description: 'Limits of the package, entity key to maximum count. Null means unlimited.'
	},
	features: {
		type: 'object',
		value: {},
		required: true,
		description: 'Feature switches of the package, feature key to boolean.'
	},
	config: {
		type: 'object',
		value: {},
		required: true,
		description: 'Config schema the package exposes, used to validate install data.'
	},
	status: {
		type: 'string',
		value: 'enabled',
		options: ['enabled', 'disabled'],
		description: 'Whether the package is active in this container. Disabled packages exist on disk but do not load.'
	}
});
