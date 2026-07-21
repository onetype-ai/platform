onetype.SchemasRegister('platform.package', {
	id: {
		type: 'string|number',
		description: 'Runtime item identifier.'
	},
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
	core: {
		type: 'string',
		value: '*',
		description: 'Semver range of the core version this package requires.'
	},
	depends: {
		type: 'array',
		value: [],
		required: true,
		each: {
			type: 'string',
			description: 'A dependency package slug.'
		},
		description: 'Slugs of packages this one depends on. They must be enabled, they load in their own runtimes.'
	},
	bundle: {
		type: 'array',
		value: [],
		required: true,
		each: {
			type: 'string',
			description: 'A bundled package slug.'
		},
		description: 'Slugs of packages whose front loads inside the runtimes of this one, transitively through their own bundle lists.'
	},
	runtimes: {
		type: 'array',
		value: [],
		each: {
			type: 'string',
			description: 'A runtime slug the package runs on, or the star that means every runtime.'
		},
		description: 'Runtimes the package loads on natively. A star runs on every runtime, empty loads only when another package bundles this one.'
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
		description: 'Default limits the package ships, entity key to maximum count. Null means unlimited, the instance config overrides the numbers.'
	},
	features: {
		type: 'object',
		value: {},
		required: true,
		description: 'Feature switches the package ships, feature key to boolean. The instance config overrides the values.'
	},
	config: {
		type: 'object',
		value: {},
		required: true,
		description: 'Config schema the package exposes, used to validate install data.'
	},
	path: {
		type: 'string',
		description: 'Absolute path to the package folder on disk.'
	},
	status: {
		type: 'string',
		value: 'enabled',
		options: ['enabled', 'disabled', 'blocked'],
		description: 'Whether the package is active in this container. Disabled packages exist on disk but do not load. Blocked is forced at load time when a dependency is not loaded.'
	},
	message: {
		type: 'string',
		value: '',
		description: 'Why the package did not load, like a disabled dependency. Empty while the package loads normally.'
	}
});
