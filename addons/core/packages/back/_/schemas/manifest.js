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
        description: 'Default limits the package ships, entity key to maximum count. Null means unlimited.'
    },
    features: {
        type: 'object',
        value: {},
        required: true,
        description: 'Feature switches the package ships, feature key to boolean.'
    },
    status: {
        type: 'string',
        value: 'enabled',
        options: ['enabled', 'disabled'],
        description: 'Whether the package is active in this container.'
    }
});
