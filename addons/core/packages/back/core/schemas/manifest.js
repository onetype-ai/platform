onetype.SchemasRegister('platform.package.manifest', {
	slug: {
		type: 'string',
		required: true,
		description: 'Stable text key the package is addressed by, like hello or builder.'
	},
	name: {
		type: 'string',
		required: true,
		description: 'Package name shown in the catalog and on the rail.'
	},
	version: {
		type: 'string',
		required: true,
		description: 'Semver version of the package.'
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
	core: {
		type: 'string',
		value: '*',
		description: 'Semver range of the core version the package requires.'
	},
	depends: {
		type: 'array',
		value: [],
		required: true,
		each: {
			type: 'string',
			description: 'A dependency package slug.'
		},
		description: 'Slugs of packages this one depends on.'
	},
	runtimes: {
		type: 'array',
		value: [],
		each: {
			type: 'string',
			description: 'A runtime slug the package runs on.'
		},
		description: 'Runtimes the package belongs to. Empty runs on every runtime.'
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
		description: 'Default limits the package ships, entity key to maximum count. Null means unlimited.'
	},
	features: {
		type: 'object',
		value: {},
		required: true,
		description: 'Feature switches the package ships, feature key to boolean.'
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
		description: 'Whether the package is active in this container.'
	}
});
