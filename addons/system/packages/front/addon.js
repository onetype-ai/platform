const packages = onetype.Addon('packages', (addon) =>
{
	addon.Field('slug', {
		type: 'string',
		required: true,
		description: 'Stable text key from the manifest, like hello or builder. Packages are addressed by slug.'
	});

	addon.Field('type', {
		type: 'string',
		value: 'package',
		options: ['core', 'package'],
		description: 'Whether this is the empty core itself or an installable package on top of it.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Package name shown in the catalog and on the rail.'
	});

	addon.Field('version', {
		type: 'string',
		required: true,
		description: 'Semver version read from the manifest on disk.'
	});

	addon.Field('description', {
		type: 'string',
		description: 'Short one line description of what the package does.'
	});

	addon.Field('icon', {
		type: 'string',
		description: 'Material Symbols icon name.'
	});

	addon.Field('color', {
		type: 'string',
		description: 'Accent color as a hex or rgba string.'
	});

	addon.Field('status', {
		type: 'string',
		value: 'enabled',
		options: ['enabled', 'disabled'],
		description: 'Whether the package is active in this container. Disabled packages exist on disk but do not load.'
	});
});

import './core/listeners/boot.js';
